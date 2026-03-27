import { useState, useRef, useEffect } from 'react';
import { useTicketStore, type Channel } from '@/stores/useTicketStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Send, X, MessageSquare, Mail, StickyNote } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const channelLabel: Record<Channel, string> = {
  telegram: 'Telegram',
  whatsapp: 'WhatsApp',
  email: 'Email',
};

export function ChatWindow() {
  const { tickets, selectedTicketId, sendMessage, closeTicket } = useTicketStore();
  const ticket = tickets.find((t) => t.id === selectedTicketId);
  const [input, setInput] = useState('');
  const [isInternalNote, setIsInternalNote] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [ticket?.messages.length]);

  if (!ticket) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background">
        <div className="text-center">
          <MessageSquare size={40} className="mx-auto text-muted-foreground/40 mb-3" />
          <p className="text-sm text-muted-foreground">Select a ticket to start chatting</p>
        </div>
      </div>
    );
  }

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(ticket.id, input.trim(), isInternalNote);
    setInput('');
  };

  const initials = ticket.customerName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="flex-1 flex flex-col bg-background min-w-0">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
        <div className="flex items-center gap-3 min-w-0">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs bg-primary/10 text-primary">{initials}</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-foreground truncate">{ticket.customerName}</h3>
            <p className="text-[10px] text-muted-foreground">via {channelLabel[ticket.channel]} · Ticket #{ticket.id}</p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={() => closeTicket(ticket.id)} className="gap-1.5 text-destructive hover:text-destructive">
          <X size={14} />
          Close Ticket
        </Button>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1" ref={scrollRef}>
        <div className="p-4 space-y-3">
          {ticket.messages.map((msg) => (
            <div key={msg.id} className={cn('flex', msg.sender === 'operator' ? 'justify-end' : 'justify-start')}>
              <div
                className={cn(
                  'max-w-[70%] rounded-lg px-3 py-2 text-sm',
                  msg.isInternalNote
                    ? 'bg-warning/10 border border-warning/30 text-foreground'
                    : msg.sender === 'operator'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground'
                )}
              >
                {msg.isInternalNote && (
                  <div className="flex items-center gap-1 text-[10px] text-warning font-medium mb-1">
                    <StickyNote size={10} />
                    Internal Note
                  </div>
                )}
                <p>{msg.text}</p>
                <p className={cn(
                  'text-[10px] mt-1',
                  msg.isInternalNote ? 'text-muted-foreground' : msg.sender === 'operator' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                )}>
                  {format(msg.timestamp, 'HH:mm')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="border-t border-border bg-card p-3">
        <div className="flex items-center gap-2 mb-2">
          <Switch checked={isInternalNote} onCheckedChange={setIsInternalNote} id="internal-note" />
          <label htmlFor="internal-note" className={cn('text-xs font-medium', isInternalNote ? 'text-warning' : 'text-muted-foreground')}>
            {isInternalNote ? '📝 Internal Note' : 'Internal Note'}
          </label>
        </div>
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
            placeholder={isInternalNote ? 'Write an internal note…' : 'Type a message…'}
            className={cn('flex-1', isInternalNote && 'border-warning/50')}
          />
          <Button onClick={handleSend} size="icon" className={cn(isInternalNote && 'bg-warning hover:bg-warning/90')}>
            <Send size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}
