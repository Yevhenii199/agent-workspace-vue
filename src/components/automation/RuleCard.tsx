import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, Zap, ArrowRight } from 'lucide-react';
import { AutomationRule } from '@/lib/supabase';
import { toast } from '@/components/ui/sonner';
import { format } from 'date-fns';

interface RuleCardProps {
  rule: AutomationRule;
  onRuleUpdated: () => void;
  onRuleDeleted: () => void;
}

export function RuleCard({ rule, onRuleUpdated, onRuleDeleted }: RuleCardProps) {
  const handleToggle = async (checked: boolean) => {
    try {
      const { supabase } = await import('@/lib/supabase');
      const { error } = await supabase
        .from('automation_rules')
        .update({ is_active: checked, updated_at: new Date().toISOString() })
        .eq('id', rule.id);

      if (error) throw error;

      toast.success(checked ? 'Rule activated' : 'Rule deactivated');
      onRuleUpdated();
    } catch (error) {
      console.error('Error toggling rule:', error);
      toast.error('Failed to update rule');
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this rule?')) return;

    try {
      const { supabase } = await import('@/lib/supabase');
      const { error } = await supabase
        .from('automation_rules')
        .delete()
        .eq('id', rule.id);

      if (error) throw error;

      toast.success('Rule deleted successfully');
      onRuleDeleted();
    } catch (error) {
      console.error('Error deleting rule:', error);
      toast.error('Failed to delete rule');
    }
  };

  return (
    <Card className={`shadow-sm transition-all ${rule.is_active ? 'border-primary/30 bg-primary/5' : 'border-muted'}`}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-2">
              <Zap className={`h-4 w-4 ${rule.is_active ? 'text-primary' : 'text-muted-foreground'}`} />
              <h3 className="font-semibold text-foreground">{rule.name}</h3>
              <Badge variant={rule.is_active ? 'default' : 'outline'} className="text-xs">
                {rule.is_active ? 'Active' : 'Inactive'}
              </Badge>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-sm">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-muted">
                <span className="font-medium text-muted-foreground">IF</span>
                <span className="text-foreground">{rule.event}</span>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-primary/10 text-primary">
                <span className="font-medium">THEN</span>
                <span>{rule.action}</span>
              </div>
            </div>

            <div className="text-xs text-muted-foreground">
              Created by {rule.created_by} · {format(new Date(rule.created_at), 'MMM d, yyyy')}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Switch
              checked={rule.is_active}
              onCheckedChange={handleToggle}
              id={`rule-${rule.id}`}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDelete}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
