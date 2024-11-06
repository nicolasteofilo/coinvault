import { useToast } from '@/hooks/use-toast'
import { createWallet } from '@/server/actions/wallets/create-wallet'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { usePortfolio } from '../portfolio-context/usePortfolio'

const createWalletSchema = z.object({
  name: z
    .string({ message: 'O nome é obrigatório' })
    .min(1, { message: 'O nome deve ter ao menos 1 caractere' }),
})

export function useNewWalletDialogController() {
  const { toast } = useToast()

  const {
    isNewWalletDialogOpen,
    handleCloseNewWalletDialogOpen,
    handleOpenNewWalletDialog,
  } = usePortfolio()

  const form = useForm<z.infer<typeof createWalletSchema>>({
    resolver: zodResolver(createWalletSchema),
  })

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await createWallet({ name: data.name })
      toast({
        title: 'Carteira criada com sucesso!',
        description: 'Você pode agora usar a sua nova carteira.',
      })
      handleCloseNewWalletDialogOpen()
    } catch (error) {
      console.log(error)
    }
  })

  return {
    handleSubmit,
    errors: form.formState.errors,
    form,
    control: form.control,
    isNewWalletDialogOpen,
    handleCloseNewWalletDialogOpen,
    handleOpenNewWalletDialog,
  }
}
