'use client'

import {
  SidebarContent,
  SidebarFooter,
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

import { cn, getInitials } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

import { Session } from 'next-auth'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { menusDropdownUser, menusSidebar } from '../data/menus'
import { UserDropdown } from './user-dropdown'

export function Sidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { data } = useSession() as { data: Session['user'] }

  return (
    <SidebarProvider>
      <SidebarUI>
        <SidebarHeader className=''>
          <Logo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu className='mt-3'>
              {menusSidebar.navMain.map((item) => {
                const asSubMenus = item?.items.length > 0

                if (asSubMenus) {
                  return (
                    <Collapsible
                      key={item.title}
                      asChild
                      className='group/collapsible'
                      defaultOpen={true}
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton tooltip={item.title}>
                            {item.icon && <item.icon />}
                            <span className='text-base'>{item.title}</span>
                            <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items?.map((subItem) => {
                              const isActive = Boolean(subItem.url === pathname)

                              return (
                                <SidebarMenuSubItem key={subItem.title}>
                                  <SidebarMenuSubButton asChild>
                                    <Link
                                      href={subItem.url}
                                      className={cn(
                                        'text-sm',
                                        isActive && 'font-bold',
                                      )}
                                    >
                                      {subItem.icon && <subItem.icon />}
                                      {subItem.title}
                                    </Link>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              )
                            })}
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
                      pathname === item.url && 'bg-secondary',
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
        <SidebarFooter>
          <UserDropdown
            user={{
              name: data?.name,
              email: data?.email,
              image: data?.image,
            }}
            data={{
              navMain: menusDropdownUser.navMain.map((item) => ({
                ...item,
                icon: <item.icon />,
              })),
            }}
            initials={getInitials(data?.name || '')}
          />
        </SidebarFooter>
      </SidebarUI>
      {children}
    </SidebarProvider>
  )
}
