interface SeparatorWithTextProps {
  text: string
}

export function SeparatorWithText({ text }: SeparatorWithTextProps) {
  return (
    <div>
      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-t border-zinc-800' />{' '}
        </div>{' '}
        <div className='relative flex justify-center px-2 text-xs uppercase'>
          <span className='bg-card px-2'>{text}</span>{' '}
        </div>{' '}
      </div>
    </div>
  )
}
