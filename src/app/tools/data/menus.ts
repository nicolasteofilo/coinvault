import { signOut } from '@/server/actions/auth/google'
import { ChartPie, Grid2X2, LogOut } from 'lucide-react'

export const menusSidebar = {
  navMain: [
    {
      title: 'Ferramentas',
      url: '/tools',
      icon: Grid2X2,
      items: [
        {
          title: 'Portfólio',
          url: '/tools/portfolio',
          icon: ChartPie,
        },
      ],
    },
  ],
}

export const menusDropdownUser = {
  navMain: [
    {
      title: 'Sair',
      icon: LogOut,
      action: signOut,
    },
  ],
}
