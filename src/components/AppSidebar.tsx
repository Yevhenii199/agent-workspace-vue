import { LayoutDashboard, Ticket, Zap, Settings, Headphones } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { NavLink } from '@/components/NavLink';
import { useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

const navItemConfig = [
  { titleKey: 'navigation.dashboard', url: '/', icon: LayoutDashboard },
  { titleKey: 'navigation.tickets', url: '/tickets', icon: Ticket },
  { titleKey: 'navigation.automation', url: '/automation', icon: Zap },
  { titleKey: 'navigation.settings', url: '/settings', icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <div className="flex items-center gap-2 px-4 py-5 border-b border-sidebar-border">
        <Headphones className="h-6 w-6 text-sidebar-primary shrink-0" />
        {!collapsed && (
          <span className="text-sidebar-accent-foreground font-semibold text-base tracking-tight">
            OmniDesk
          </span>
        )}
      </div>

      <SidebarContent className="pt-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItemConfig.map((item) => {
                const isActive = item.url === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(item.url);

                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={t(item.titleKey)}
                    >
                      <NavLink
                        to={item.url}
                        end={item.url === '/'}
                        className="hover:bg-sidebar-accent"
                        activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                      >
                        <item.icon className="h-4 w-4 shrink-0" />
                        {!collapsed && <span>{t(item.titleKey)}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
