'use client'

import type React from 'react'

import { HeaderComponent } from '@/components/header'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { ScanLine, FileText, BarChart3, Settings, Plus } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface LayoutWithSidebarProps {
  children: React.ReactNode
}

export function LayoutWithSidebar({ children }: LayoutWithSidebarProps) {
  const pathname = usePathname()

  const navigation = [
    { name: 'Escanear Ticket', href: '/upload', icon: ScanLine },
    { name: 'Crear Manual', href: '/tickets/create', icon: Plus },
    { name: 'Mis Tickets', href: '/tickets', icon: FileText },
    { name: 'Reportes', href: '/reports', icon: BarChart3 },
    { name: 'Configuración', href: '/settings', icon: Settings },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Link href='/tickets' className='flex items-center space-x-2 p-2'>
            <div className='bg-teal-600 p-2 rounded-lg'>
              <ScanLine className='h-5 w-5 text-white' />
            </div>
            <span className='text-lg font-bold text-slate-800'>Cashtos</span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navegación</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navigation.map((item) => {
                  const Icon = item.icon
                  return (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton asChild isActive={isActive(item.href)}>
                        <Link href={item.href}>
                          <Icon className='h-4 w-4' />
                          <span>{item.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>{/* Footer  */}</SidebarFooter>
      </Sidebar>
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
