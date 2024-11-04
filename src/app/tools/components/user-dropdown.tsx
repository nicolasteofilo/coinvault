import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronsUpDown } from 'lucide-react'
import { Session } from 'next-auth'

interface UserDropdownProps {
  user: Session['user']
  initials: string

  data?: {
    navMain: {
      title: string
      action?: (() => Promise<never>) | (() => void)
      icon: React.ReactNode
    }[]
  }
}

export function UserDropdown({ user, data, initials }: UserDropdownProps) {
  if (!user) return null

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className='flex items-center gap-2 rounded-lg p-2 hover:bg-secondary'>
            <Avatar className='h-8 w-8 rounded-lg'>
              <AvatarImage src={user.image!} alt={user.name!} />
              <AvatarFallback className='rounded-lg'>{initials}</AvatarFallback>
            </Avatar>

            <div className='grid flex-1 text-left text-sm leading-tight'>
              <span className='truncate font-semibold'>{user.name!}</span>
              <span className='truncate text-xs'>{user.email!}</span>
            </div>

            <ChevronsUpDown className='ml-auto size-4' />
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          side='top'
          className='w-full min-w-56 rounded-lg bg-background/10'
        >
          {data?.navMain.map((item) => (
            <DropdownMenuItem
              key={item.title}
              onClick={item.action}
              className='flex cursor-pointer items-center rounded-lg p-2 outline-none'
            >
              {item.icon}
              <span className='ml-2 text-base'>{item.title}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
