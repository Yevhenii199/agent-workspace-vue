import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useOperatorProfile } from '@/composables/useOperatorProfile';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader as Loader2 } from 'lucide-react';

export function ProfileForm() {
  const { t } = useTranslation();
  const { profile, loading, updateProfile } = useOperatorProfile();
  const { toast } = useToast();

  const [name, setName] = useState(profile?.name || '');
  const [email, setEmail] = useState(profile?.email || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = await updateProfile(name, email);

    if (result.success) {
      toast({
        title: t('common.success'),
        description: t('settings.profileUpdated'),
        variant: 'default',
      });
    } else {
      toast({
        title: t('common.error'),
        description: t(`${result.error}`),
        variant: 'destructive',
      });
    }

    setIsSubmitting(false);
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t('settings.profile')}</CardTitle>
          <CardDescription>{t('settings.profileDescription')}</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('settings.profile')}</CardTitle>
        <CardDescription>{t('settings.profileDescription')}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">{t('settings.name')}</Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isSubmitting}
              className="max-w-md"
            />
            <p className="text-xs text-muted-foreground">{t('settings.nameHelp')}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{t('settings.email')}</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              className="max-w-md"
            />
            <p className="text-xs text-muted-foreground">{t('settings.emailHelp')}</p>
          </div>

          <div className="flex gap-3">
            <Button
              type="submit"
              disabled={isSubmitting || !name.trim() || !email.trim()}
            >
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSubmitting ? t('common.loading') : t('common.save')}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
