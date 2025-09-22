'use client';

import  useSidebar from '@/context/SidebarContext';
import  {AppSidebar} from '@/layout/AppSidebar';
import Backdrop from '@/layout/Backdrop';
import { Provider } from 'react-redux';
import { store } from '@/lib/store';
import  AppHeader from '@/layout/AppHeader';


export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  

  const mainContentPadding = isMobileOpen
    ? 'pl-0'
    : isExpanded || isHovered
    ? 'lg:pl-[260px]'
    : 'lg:pl-[90px]';

  return (
    <div className="min-h-screen flex">
      <AppSidebar />
      <Backdrop />
      <div className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${mainContentPadding}`}>
        <AppHeader />
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <Provider store={store}>
            {children}
          </Provider>
        </div>
      </div>
    </div>
  );
}