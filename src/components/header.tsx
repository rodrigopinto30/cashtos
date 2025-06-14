'use client'

import { useRouter } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { User, LogOut, Settings } from 'lucide-react'

export function HeaderComponent() {
  const router = useRouter()

  const handleLogout = () => {
    document.cookie =
      'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
    router.push('/auth/login')
  }

  return (
    <div className='flex-1 flex justify-end'>
      {/* User Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='flex items-center space-x-2'>
            <div className='bg-slate-200 p-2 rounded-full'>
              <User className='h-4 w-4 text-slate-600' />
            </div>
            <span className='hidden md:block text-slate-700'>Usuario Demo</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-56'>
          <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <User className='mr-2 h-4 w-4' />
            <span>Perfil</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className='mr-2 h-4 w-4' />
            <span>Configuración</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className='text-red-600'>
            <LogOut className='mr-2 h-4 w-4' />
            <span>Cerrar Sesión</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
