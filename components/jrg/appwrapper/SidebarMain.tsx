'use client';

import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import { usePathname } from 'next/navigation';

import { AgentSelector } from '../../interactive/Selectors/agent-selector';
import { ChatHistory } from '../../interactive/Layout/chat-history';
import { NavMain } from '@/components/jrg/appwrapper/NavMain';
import { NavUser } from '@/components/jrg/appwrapper/NavUser';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';
import { ToggleSidebar } from './ToggleSidebar';
import { useUser } from '../auth/hooks/useUser';
import { NotificationsNavItem } from '@/interactive/Notifications/popup';

export function SidebarMain({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [hasStarted, setHasStarted] = useState(false);
  const pathname = usePathname();
  const { data: user } = useUser();
  const isAuthenticated = !!user?.email;

  useEffect(() => {
    if (getCookie('agixt-has-started') === 'true') {
      setHasStarted(true);
    }
  }, [getCookie('agixt-has-started')]);

  if (pathname === '/' || (pathname.startsWith('/user') && pathname !== '/user/manage')) return null;

  return (
    <Sidebar collapsible='icon' {...props} className='hide-scrollbar'>
      <SidebarHeader>
        {isAuthenticated && <AgentSelector />}
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
        {isAuthenticated && <ChatHistory />}
      </SidebarContent>
      <SidebarFooter>
        {/* <NotificationsNavItem /> */}
        <ToggleSidebar side='left' />
        {isAuthenticated && <NavUser />}
      </SidebarFooter>
      <SidebarRail side='left' />
    </Sidebar>
  );
}
