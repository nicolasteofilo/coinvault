import { ChartPie, Grid2X2 } from 'lucide-react'

export const menus = {
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
