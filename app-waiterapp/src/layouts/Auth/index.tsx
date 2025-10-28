import { Navigate, Outlet } from '@tanstack/react-router'
import Cookies from 'js-cookie'

import { Welcome } from '@/features/SignIn/components/Welcome'
import { useAuthContext } from '@/shared/contexts/AuthContext'

export default function AuthLayout() {
  const { isAuthenticated } = useAuthContext()

  console.log({ isAuthenticated, token: Cookies.get('accessToken') })

  if (isAuthenticated) {
    return <Navigate to="/" />
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-3 max-w-[420px] mx-auto my-0 p-3">
      <Welcome />
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  )
}
