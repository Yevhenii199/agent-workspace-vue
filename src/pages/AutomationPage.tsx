import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { RuleBuilder } from '@/components/automation/RuleBuilder';
import { RuleCard } from '@/components/automation/RuleCard';
import { AutomationRule, supabase } from '@/lib/supabase';
import { Loader as Loader2 } from 'lucide-react';

const AutomationPage = () => {
  const [rules, setRules] = useState<AutomationRule[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRules = async () => {
    try {
      const { data, error } = await supabase
        .from('automation_rules')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRules(data || []);
    } catch (error) {
      console.error('Error fetching rules:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRules();
  }, []);

  const activeRulesCount = rules.filter(r => r.is_active).length;
  const totalRulesCount = rules.length;

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Automation</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Configure workflows, routing rules, and automated responses.
          </p>
          <div className="flex items-center gap-4 mt-3">
            <div className="text-sm">
              <span className="font-medium text-primary">{activeRulesCount}</span>
              <span className="text-muted-foreground"> active rules</span>
            </div>
            <div className="h-1 w-1 rounded-full bg-muted-foreground/30" />
            <div className="text-sm text-muted-foreground">
              {totalRulesCount} total
            </div>
          </div>
        </div>

        <RuleBuilder onRuleCreated={fetchRules} />

        <div className="space-y-3">
          <h3 className="text-base font-semibold text-foreground">Active Rules</h3>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : rules.length === 0 ? (
            <div className="text-center py-12 border border-dashed rounded-lg">
              <p className="text-sm text-muted-foreground">No automation rules yet</p>
              <p className="text-xs text-muted-foreground mt-1">Create your first rule above to get started</p>
            </div>
          ) : (
            <div className="space-y-3">
              {rules.map((rule) => (
                <RuleCard
                  key={rule.id}
                  rule={rule}
                  onRuleUpdated={fetchRules}
                  onRuleDeleted={fetchRules}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AutomationPage;
