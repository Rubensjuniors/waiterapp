import { Outlet } from '@tanstack/react-router'

import { Welcome } from '@/features/AuthLayout/components/Welcome'

export default function AuthLayout() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-3 max-w-[420px] mx-auto my-0 p-3">
      <Welcome />
      <div className="auth-content">
        <Outlet />
      </div>
    </div>
  )
}
