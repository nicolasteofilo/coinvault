import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import { Separator } from '@radix-ui/react-separator'
import Link from 'next/link'

interface PageWrapperProps {
  title?: string
  paths: {
    name: string
    href: string
  }[]
  children: React.ReactNode
  actions?: React.ReactNode
  className?: string
}

export function PageWrapper({
  children,
  paths,
  actions,
  className,
}: PageWrapperProps) {
  console.log(paths)

  return (
    <SidebarInset className={cn(className)}>
      <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
        <div className='flex w-full items-center justify-between gap-2 px-4'>
          <div className='flex items-center'>
            <SidebarTrigger className='-ml-1 mr-3' />
            <Separator orientation='vertical' className='-mr-2.5 h-4' />
            <Breadcrumb>
              <BreadcrumbList>
                {paths.map((path, index) => (
                  <div key={path.href} className='flex items-center'>
                    <BreadcrumbItem className='hidden md:block'>
                      <Link href={path.href}>
                        <p>{path.name}</p>
                      </Link>
                    </BreadcrumbItem>
                    {index !== paths.length - 1 && (
                      <BreadcrumbSeparator className='ml-2' />
                    )}
                  </div>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div>{actions}</div>
        </div>
      </header>
      <div className='flex flex-1 flex-col pl-[18px]'>{children}</div>
    </SidebarInset>
  )
}
