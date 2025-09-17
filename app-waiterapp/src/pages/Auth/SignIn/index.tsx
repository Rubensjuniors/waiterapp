import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate, useSearch } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { Button, FormMenssage, Input, Label } from '@/shared/components/Atoms'

const signInForm = z.object({
  email: z.email('E-mail inválido.'),
  password: z.string().min(8, 'Precisa ter no mínimo 8 caracteres.'),
})

type SignInForm = z.infer<typeof signInForm>

export default function SignIn() {
  const navigate = useNavigate()
  const { email } = useSearch({
    strict: false,
  })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
    reset,
  } = useForm<SignInForm>({
    resolver: zodResolver(signInForm),
    defaultValues: {
      email,
      password: '',
    },
  })

  async function handleSignIn(data: SignInForm) {
    const { email, password } = data
    try {
      console.log('handleSignIn', { email, password })

      navigate({ to: '/' })
      reset()
    } catch (error: unknown) {
      console.error(error)
    }
  }
  return (
    <div>
      <form className="space-y-4 w-full" onSubmit={handleSubmit(handleSignIn)}>
        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input
            className="py-6"
            id="email"
            type="email"
            {...register('email')}
            placeholder="Digite seu e-mail"
          />
          {errors.email && <FormMenssage>{errors.email?.message}</FormMenssage>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>
          <Input
            className="py-6"
            id="password"
            type="password"
            {...register('password')}
            placeholder="Digite sua senha"
          />
          {errors.password && <FormMenssage>{errors.password?.message}</FormMenssage>}
        </div>

        <Button
          variant="default"
          disabled={isSubmitting || !isValid}
          className="w-full rounded-full"
          type="submit"
        >
          Entrar
        </Button>
      </form>
      <Button variant="ghost" className="w-full rounded-full mt-4">
        <Link to="/sign-up">Criar conta</Link>
      </Button>
    </div>
  )
}
