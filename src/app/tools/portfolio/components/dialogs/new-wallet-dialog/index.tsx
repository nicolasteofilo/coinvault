'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { Plus } from 'lucide-react'
import { useNewWalletDialogController } from './useNewWalletDialogConytoller'

export function NewWalletDialog() {
  const {
    errors,
    handleSubmit,
    control,
    isNewWalletDialogOpen,
    handleOpenNewWalletDialog,
    handleCloseNewWalletDialogOpen,
  } = useNewWalletDialogController()

  return (
    <Dialog open={isNewWalletDialogOpen}>
      <DialogTrigger asChild>
        <Button variant='outline' onClick={handleOpenNewWalletDialog}>
          <Plus /> Criar carteira
        </Button>
      </DialogTrigger>
      <DialogContent onClose={handleCloseNewWalletDialogOpen}>
        <DialogHeader>
          <DialogTitle>Criar carteira</DialogTitle>
          <DialogDescription>
            Crie uma nova carteira para organizar seus investimentos
          </DialogDescription>
        </DialogHeader>
        <form className='flex flex-col gap-4'>
          <FormField
            control={control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <Label className='font-semibold'>Nome</Label>
                <Input
                  {...field}
                  placeholder='Insira o nome da carteira'
                  className='w-full'
                  error={errors.name?.message}
                  value={undefined}
                />
              </FormItem>
            )}
          />
          <div className='flex w-full justify-end'>
            <DialogClose asChild>
              <Button type='submit' onClick={handleSubmit}>
                Criar
              </Button>
            </DialogClose>
          </div>
        </form>

        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
