import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from '@tanstack/react-router'

import { queryClient } from '@/lib/queryClient'
import { AuthProvider } from '@/shared/contexts/AuthContext'

import { router } from './routes'

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} position="left" buttonPosition="bottom-left" />
    </QueryClientProvider>
  )
}
