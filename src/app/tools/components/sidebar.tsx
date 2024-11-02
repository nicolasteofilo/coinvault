import {
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  Sidebar as SidebarUI,
} from '@/components/ui/sidebar'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'

import { Logo } from './logo'

import { cn } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

import console from 'console'
import { headers } from 'next/headers'
import { menus } from '../data/menus'

export async function Sidebar({ children }: { children: React.ReactNode }) {
  const headerList = headers()
  const pathname = (await headerList).get('x-current-path')

  console.log(pathname)

  return (
    <SidebarProvider>
      <SidebarUI>
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu className='mt-3'>
              {menus.navMain.map((item) => {
                const asSubMenus = !!item.items

                if (asSubMenus) {
                  return (
                    <Collapsible
                      key={item.title}
                      asChild
                      className='group/collapsible'
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton tooltip={item.title}>
                            {item.icon && <item.icon />}
                            <span>{item.title}</span>
                            <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items?.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton asChild>
                                  <Link href={subItem.url}>
                                    {subItem.icon && <subItem.icon />}
                                    <span
                                      className={cn(
                                        'text-sm',
                                        pathname === subItem.url &&
                                          'font-semibold',
                                      )}
                                    >
                                      {subItem.title}
                                    </span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  )
                }

                return (
                  <SidebarMenuItem
                    key={item.title}
                    className={cn(
                      'rounded-md hover:bg-secondary',
                      // pathname === item.url && 'bg-secondary',
                    )}
                  >
                    <SidebarMenuButton asChild>
                      <Link href={item.url} className='text-sm'>
                        <item.icon />
                        <span className='text-sm'>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </SidebarUI>
      {children}
    </SidebarProvider>
  )
}
