import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

const EVENT_OPTIONS = [
  { value: 'New Ticket Received', label: 'New Ticket Received' },
  { value: 'Ticket Escalated', label: 'Ticket Escalated' },
  { value: 'Customer Offline', label: 'Customer Offline' },
];

const ACTION_OPTIONS = [
  { value: 'Send Template Message', label: 'Send Template Message' },
  { value: 'Assign to Senior Agent', label: 'Assign to Senior Agent' },
  { value: 'Tag as Urgent', label: 'Tag as Urgent' },
];

interface RuleBuilderProps {
  onRuleCreated: () => void;
}

export function RuleBuilder({ onRuleCreated }: RuleBuilderProps) {
  const [ruleName, setRuleName] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('');
  const [selectedAction, setSelectedAction] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!ruleName || !selectedEvent || !selectedAction) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const { supabase } = await import('@/lib/supabase');
      const { error } = await supabase
        .from('automation_rules')
        .insert({
          name: ruleName,
          event: selectedEvent,
          action: selectedAction,
          is_active: true,
        });

      if (error) throw error;

      toast.success('Rule created successfully');
      setRuleName('');
      setSelectedEvent('');
      setSelectedAction('');
      onRuleCreated();
    } catch (error) {
      console.error('Error creating rule:', error);
      toast.error('Failed to create rule');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create New Rule
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="rule-name">Rule Name</Label>
            <Input
              id="rule-name"
              placeholder="e.g., Auto-escalate urgent tickets"
              value={ruleName}
              onChange={(e) => setRuleName(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="event">IF (Event)</Label>
              <Select value={selectedEvent} onValueChange={setSelectedEvent}>
                <SelectTrigger id="event">
                  <SelectValue placeholder="Select event" />
                </SelectTrigger>
                <SelectContent>
                  {EVENT_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="action">THEN (Action)</Label>
              <Select value={selectedAction} onValueChange={setSelectedAction}>
                <SelectTrigger id="action">
                  <SelectValue placeholder="Select action" />
                </SelectTrigger>
                <SelectContent>
                  {ACTION_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? 'Creating...' : 'Create Rule'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
