import { ReactNode } from 'react'
import { AppSidebar } from '@/components/app-sidebar'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { HeaderComponent } from './header'

export default function LayoutComponent({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      {/*       <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-2 border-b'>
          <div className='flex items-center gap-2 px-3'>
            <SidebarTrigger />
            <Separator orientation='vertical' className='mr-2 h-4' />
          </div>
        </header>
        <div>{children}</div>
      </SidebarInset> */}
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-2 border-b px-4'>
          <SidebarTrigger className='-ml-1' />
          <HeaderComponent />
        </header>
        <main className='flex-1 overflow-y-auto p-4 sm:p-6'>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
