import { useMutation } from '@tanstack/react-query'

import { authenticateService } from '@/services/requests/Auth'

export function useSignIn() {
  return useMutation({
    mutationFn: authenticateService.signIn,
  })
}
