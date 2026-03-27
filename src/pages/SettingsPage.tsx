import { useTranslation } from 'react-i18next';
import { DashboardLayout } from '@/components/DashboardLayout';
import { ProfileForm } from '@/components/settings/ProfileForm';

const SettingsPage = () => {
  const { t } = useTranslation();

  return (
    <DashboardLayout>
      <div className="p-6 max-w-3xl">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-foreground">{t('settings.title')}</h2>
          <p className="text-sm text-muted-foreground mt-1">Manage your contact center configuration and preferences.</p>
        </div>

        <ProfileForm />
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
