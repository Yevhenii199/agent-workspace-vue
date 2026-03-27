import { useTicketStore, type Channel, type Priority } from '@/stores/useTicketStore';
import { MessageSquare, Send, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

const channelIcon: Record<Channel, React.ReactNode> = {
  telegram: <Send size={14} />,
  whatsapp: <MessageSquare size={14} />,
  email: <Mail size={14} />,
};

const channelLabel: Record<Channel, string> = {
  telegram: 'Telegram',
  whatsapp: 'WhatsApp',
  email: 'Email',
};

const priorityStyles: Record<Priority, string> = {
  high: 'bg-destructive/15 text-destructive border-destructive/30',
  medium: 'bg-warning/15 text-warning border-warning/30',
  low: 'bg-success/15 text-success border-success/30',
};

export function TicketList() {
  const { tickets, selectedTicketId, selectTicket } = useTicketStore();
  const { t } = useTranslation();
  const openTickets = tickets.filter((t) => t.status === 'open');

  return (
    <div className="flex flex-col h-full border-r border-border bg-card">
      <div className="px-4 py-3 border-b border-border">
        <h2 className="text-sm font-semibold text-foreground">Active Tickets</h2>
        <p className="text-xs text-muted-foreground mt-0.5">{openTickets.length} {t('ticketStatus.open').toLowerCase()}</p>
      </div>
      <ScrollArea className="flex-1">
        <div className="divide-y divide-border">
          {openTickets.map((ticket) => (
            <button
              key={ticket.id}
              onClick={() => selectTicket(ticket.id)}
              className={cn(
                'w-full text-left px-4 py-3 transition-colors hover:bg-muted/50',
                selectedTicketId === ticket.id && 'bg-primary/5 border-l-2 border-l-primary'
              )}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-foreground truncate">{ticket.customerName}</span>
                <span className="text-[10px] text-muted-foreground whitespace-nowrap ml-2">
                  {formatDistanceToNow(ticket.updatedAt, { addSuffix: true })}
                </span>
              </div>
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  {channelIcon[ticket.channel]}
                  {channelLabel[ticket.channel]}
                </span>
                <Badge
                  variant="outline"
                  className={cn('text-[10px] px-1.5 py-0 h-4 font-medium capitalize', priorityStyles[ticket.priority])}
                >
                  {ticket.priority}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground truncate">{ticket.lastMessage}</p>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
