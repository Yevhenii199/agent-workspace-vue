import { DashboardLayout } from '@/components/DashboardLayout';
import { TicketList } from '@/components/tickets/TicketList';
import { ChatWindow } from '@/components/tickets/ChatWindow';

const TicketsPage = () => (
  <DashboardLayout>
    <div className="flex h-[calc(100vh-3.5rem)] overflow-hidden">
      <div className="w-80 shrink-0">
        <TicketList />
      </div>
      <ChatWindow />
    </div>
  </DashboardLayout>
);

export default TicketsPage;
