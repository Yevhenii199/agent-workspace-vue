import { ChevronDown } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useOperatorStore, type OperatorStatus } from '@/stores/useOperatorStore';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const statusConfig: Record<OperatorStatus, { label: string; color: string }> = {
  online: { label: 'Online', color: 'bg-success' },
  away: { label: 'Away', color: 'bg-warning' },
  offline: { label: 'Offline', color: 'bg-muted-foreground' },
};

export function DashboardHeader() {
  const { status, operatorName, setStatus } = useOperatorStore();
  const current = statusConfig[status];

  return (
    <header className="h-14 flex items-center justify-between border-b px-4 bg-card">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="text-muted-foreground" />
        <div className="h-5 w-px bg-border mx-1" />
        <h1 className="text-sm font-semibold text-foreground">Contact Center</h1>
      </div>

      <div className="flex items-center gap-3">
        <LanguageSwitcher />
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm hover:bg-muted transition-colors outline-none">
            <span className={`h-2 w-2 rounded-full ${current.color}`} />
            <span className="font-medium text-foreground">{current.label}</span>
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {(Object.keys(statusConfig) as OperatorStatus[]).map((s) => (
              <DropdownMenuItem key={s} onClick={() => setStatus(s)} className="gap-2">
                <span className={`h-2 w-2 rounded-full ${statusConfig[s].color}`} />
                {statusConfig[s].label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-semibold">
            {operatorName.split(' ').map(n => n[0]).join('')}
          </div>
        </div>
      </div>
    </header>
  );
}
