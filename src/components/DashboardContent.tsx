import { Phone, MessageSquare, Mail, Clock, TrendingUp, Users, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const stats = [
  { label: 'Active Calls', value: '12', icon: Phone, change: '+3', trend: 'up' as const },
  { label: 'Open Chats', value: '28', icon: MessageSquare, change: '+7', trend: 'up' as const },
  { label: 'Email Queue', value: '45', icon: Mail, change: '-5', trend: 'down' as const },
  { label: 'Avg Wait Time', value: '1:42', icon: Clock, change: '-0:15', trend: 'down' as const },
];

const recentTickets = [
  { id: 'TK-4521', subject: 'Payment processing error', channel: 'Email', priority: 'high', status: 'open', time: '2m ago' },
  { id: 'TK-4520', subject: 'Account login issue', channel: 'Chat', priority: 'medium', status: 'in-progress', time: '8m ago' },
  { id: 'TK-4519', subject: 'Subscription cancellation', channel: 'Phone', priority: 'low', status: 'open', time: '12m ago' },
  { id: 'TK-4518', subject: 'Feature request: dark mode', channel: 'Email', priority: 'low', status: 'resolved', time: '25m ago' },
  { id: 'TK-4517', subject: 'Billing discrepancy Q4', channel: 'Chat', priority: 'high', status: 'in-progress', time: '32m ago' },
];

const priorityStyles: Record<string, string> = {
  high: 'bg-destructive/10 text-destructive',
  medium: 'bg-warning/10 text-warning',
  low: 'bg-muted text-muted-foreground',
};

const statusStyles: Record<string, string> = {
  open: 'text-primary',
  'in-progress': 'text-warning',
  resolved: 'text-success',
};

export function DashboardContent() {
  return (
    <div className="p-6 space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs">
                <TrendingUp className={`h-3 w-3 ${stat.trend === 'up' ? 'text-success' : 'text-success rotate-180'}`} />
                <span className="text-success font-medium">{stat.change}</span>
                <span className="text-muted-foreground">vs last hour</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bottom grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Tickets */}
        <Card className="lg:col-span-2 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Recent Tickets</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-muted-foreground">
                    <th className="text-left font-medium px-5 py-2.5">ID</th>
                    <th className="text-left font-medium px-5 py-2.5">Subject</th>
                    <th className="text-left font-medium px-5 py-2.5">Channel</th>
                    <th className="text-left font-medium px-5 py-2.5">Priority</th>
                    <th className="text-left font-medium px-5 py-2.5">Status</th>
                    <th className="text-right font-medium px-5 py-2.5">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTickets.map((ticket) => (
                    <tr key={ticket.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                      <td className="px-5 py-3 font-medium text-primary">{ticket.id}</td>
                      <td className="px-5 py-3 text-foreground">{ticket.subject}</td>
                      <td className="px-5 py-3 text-muted-foreground">{ticket.channel}</td>
                      <td className="px-5 py-3">
                        <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium capitalize ${priorityStyles[ticket.priority]}`}>
                          {ticket.priority}
                        </span>
                      </td>
                      <td className={`px-5 py-3 font-medium capitalize ${statusStyles[ticket.status]}`}>{ticket.status.replace('-', ' ')}</td>
                      <td className="px-5 py-3 text-right text-muted-foreground">{ticket.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Team Performance */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Team Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">18 Agents Online</p>
                <p className="text-xs text-muted-foreground">of 24 total agents</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <CheckCircle className="h-5 w-5 text-success" />
              <div>
                <p className="text-sm font-medium text-foreground">142 Resolved Today</p>
                <p className="text-xs text-muted-foreground">93% satisfaction rate</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <AlertCircle className="h-5 w-5 text-warning" />
              <div>
                <p className="text-sm font-medium text-foreground">7 Escalations</p>
                <p className="text-xs text-muted-foreground">3 awaiting review</p>
              </div>
            </div>

            <div className="pt-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">Channel Distribution</p>
              <div className="space-y-2">
                {[
                  { label: 'Chat', pct: 45, color: 'bg-primary' },
                  { label: 'Email', pct: 30, color: 'bg-success' },
                  { label: 'Phone', pct: 20, color: 'bg-warning' },
                  { label: 'Social', pct: 5, color: 'bg-muted-foreground' },
                ].map((ch) => (
                  <div key={ch.label} className="flex items-center gap-2 text-xs">
                    <span className="w-12 text-muted-foreground">{ch.label}</span>
                    <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${ch.color}`} style={{ width: `${ch.pct}%` }} />
                    </div>
                    <span className="w-8 text-right text-muted-foreground">{ch.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
