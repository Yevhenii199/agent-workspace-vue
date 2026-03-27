import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react';

export type PriorityLevel = 'high' | 'medium' | 'low';

const priorityConfig: Record<PriorityLevel, { style: string; Icon: React.ElementType }> = {
  high: {
    style: 'bg-destructive/15 text-destructive border-destructive/30',
    Icon: AlertTriangle,
  },
  medium: {
    style: 'bg-warning/15 text-warning border-warning/30',
    Icon: AlertCircle,
  },
  low: {
    style: 'bg-success/15 text-success border-success/30',
    Icon: CheckCircle,
  },
};

interface PriorityBadgeProps {
  priority: string;
  className?: string;
}

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  const normalized = priority?.toLowerCase() as PriorityLevel;
  const config = priorityConfig[normalized];

  if (!config) {
    return (
      <Badge variant="outline" className={cn('text-[10px] px-1.5 py-0 h-4 font-medium capitalize', className)}>
        {priority || 'unknown'}
      </Badge>
    );
  }

  const { style, Icon } = config;

  return (
    <Badge
      variant="outline"
      className={cn('text-[10px] px-1.5 py-0 h-4 font-medium capitalize gap-1', style, className)}
    >
      <Icon size={10} aria-hidden="true" />
      {priority}
    </Badge>
  );
}
