import { create } from 'zustand';

export type Channel = 'telegram' | 'whatsapp' | 'email';
export type Priority = 'low' | 'medium' | 'high';
export type MessageSender = 'operator' | 'customer';

export interface Message {
  id: string;
  sender: MessageSender;
  text: string;
  timestamp: Date;
  isInternalNote?: boolean;
}

export interface Ticket {
  id: string;
  customerName: string;
  channel: Channel;
  priority: Priority;
  status: 'open' | 'closed';
  lastMessage: string;
  messages: Message[];
  updatedAt: Date;
}

interface TicketState {
  tickets: Ticket[];
  selectedTicketId: string | null;
  selectTicket: (id: string) => void;
  sendMessage: (ticketId: string, text: string, isInternalNote?: boolean) => void;
  addAutoReply: (ticketId: string) => void;
  closeTicket: (ticketId: string) => void;
}

const mockTickets: Ticket[] = [
  {
    id: '1',
    customerName: 'Maria Gonzalez',
    channel: 'whatsapp',
    priority: 'high',
    status: 'open',
    lastMessage: "I still haven't received my refund. It's been 5 days!",
    updatedAt: new Date(Date.now() - 1000 * 60 * 3),
    messages: [
      { id: 'm1', sender: 'customer', text: 'Hi, I requested a refund last week.', timestamp: new Date(Date.now() - 1000 * 60 * 60) },
      { id: 'm2', sender: 'operator', text: 'Let me check your order status.', timestamp: new Date(Date.now() - 1000 * 60 * 50) },
      { id: 'm3', sender: 'customer', text: "I still haven't received my refund. It's been 5 days!", timestamp: new Date(Date.now() - 1000 * 60 * 3) },
    ],
  },
  {
    id: '2',
    customerName: 'James Liu',
    channel: 'telegram',
    priority: 'medium',
    status: 'open',
    lastMessage: 'Can you help me change my subscription plan?',
    updatedAt: new Date(Date.now() - 1000 * 60 * 12),
    messages: [
      { id: 'm4', sender: 'customer', text: 'Can you help me change my subscription plan?', timestamp: new Date(Date.now() - 1000 * 60 * 12) },
    ],
  },
  {
    id: '3',
    customerName: 'Aisha Patel',
    channel: 'email',
    priority: 'low',
    status: 'open',
    lastMessage: 'Thanks for the quick response! One more question…',
    updatedAt: new Date(Date.now() - 1000 * 60 * 45),
    messages: [
      { id: 'm5', sender: 'customer', text: 'Hello, I have a question about my invoice.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) },
      { id: 'm6', sender: 'operator', text: "Sure, I can help. What's the invoice number?", timestamp: new Date(Date.now() - 1000 * 60 * 60) },
      { id: 'm7', sender: 'customer', text: "It's INV-20345. The amount seems incorrect.", timestamp: new Date(Date.now() - 1000 * 60 * 50) },
      { id: 'm8', sender: 'operator', text: 'I see the discrepancy. Let me correct it for you.', timestamp: new Date(Date.now() - 1000 * 60 * 48) },
      { id: 'm9', sender: 'customer', text: 'Thanks for the quick response! One more question…', timestamp: new Date(Date.now() - 1000 * 60 * 45) },
    ],
  },
  {
    id: '4',
    customerName: 'Oliver Schmidt',
    channel: 'whatsapp',
    priority: 'high',
    status: 'open',
    lastMessage: "My account is locked and I can't access anything!",
    updatedAt: new Date(Date.now() - 1000 * 60 * 1),
    messages: [
      { id: 'm10', sender: 'customer', text: "My account is locked and I can't access anything!", timestamp: new Date(Date.now() - 1000 * 60 * 1) },
    ],
  },
  {
    id: '5',
    customerName: 'Yuki Tanaka',
    channel: 'telegram',
    priority: 'low',
    status: 'open',
    lastMessage: 'Just wanted to say your product is great 👍',
    updatedAt: new Date(Date.now() - 1000 * 60 * 120),
    messages: [
      { id: 'm11', sender: 'customer', text: 'Just wanted to say your product is great 👍', timestamp: new Date(Date.now() - 1000 * 60 * 120) },
    ],
  },
  {
    id: '6',
    customerName: 'Emma Dubois',
    channel: 'email',
    priority: 'medium',
    status: 'open',
    lastMessage: 'When will the new feature be available?',
    updatedAt: new Date(Date.now() - 1000 * 60 * 30),
    messages: [
      { id: 'm12', sender: 'customer', text: 'When will the new feature be available?', timestamp: new Date(Date.now() - 1000 * 60 * 30) },
      { id: 'm13', sender: 'operator', text: "We're targeting a release next month.", timestamp: new Date(Date.now() - 1000 * 60 * 25) },
    ],
  },
];

const autoReplies = [
  'Thanks for the update! Let me look into this further.',
  "Got it. I'll check with my manager and get back to you.",
  'Could you provide a bit more detail so I can help faster?',
  "I understand your concern. We're working on a resolution.",
  'That makes sense. Let me pull up your account.',
];

let msgCounter = 100;

export const useTicketStore = create<TicketState>((set, get) => ({
  tickets: mockTickets,
  selectedTicketId: '1',

  selectTicket: (id) => set({ selectedTicketId: id }),

  sendMessage: (ticketId, text, isInternalNote = false) => {
    const newMsg: Message = {
      id: `msg-${++msgCounter}`,
      sender: 'operator',
      text,
      timestamp: new Date(),
      isInternalNote,
    };
    set((state) => ({
      tickets: state.tickets.map((t) =>
        t.id === ticketId
          ? { ...t, messages: [...t.messages, newMsg], lastMessage: isInternalNote ? t.lastMessage : text, updatedAt: new Date() }
          : t
      ),
    }));

    if (!isInternalNote) {
      setTimeout(() => get().addAutoReply(ticketId), 2000);
    }
  },

  addAutoReply: (ticketId) => {
    const reply = autoReplies[Math.floor(Math.random() * autoReplies.length)];
    const newMsg: Message = {
      id: `msg-${++msgCounter}`,
      sender: 'customer',
      text: reply,
      timestamp: new Date(),
    };
    set((state) => ({
      tickets: state.tickets.map((t) =>
        t.id === ticketId
          ? { ...t, messages: [...t.messages, newMsg], lastMessage: reply, updatedAt: new Date() }
          : t
      ),
    }));
  },

  closeTicket: (ticketId) =>
    set((state) => ({
      tickets: state.tickets.map((t) =>
        t.id === ticketId ? { ...t, status: 'closed' } : t
      ),
      selectedTicketId: state.selectedTicketId === ticketId ? null : state.selectedTicketId,
    })),
}));
