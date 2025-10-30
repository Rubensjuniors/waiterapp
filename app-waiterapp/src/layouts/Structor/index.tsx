/* eslint-disable react-hooks/rules-of-hooks */
import { Navigate, Outlet } from '@tanstack/react-router'

import { SidebarMenu } from '@/features/Structor/components/SidebarMenu'
import { useAuthContext } from '@/shared/contexts/AuthContext'

export default function StructorLayout() {
  const { isAuthenticated } = useAuthContext()

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" />
  }

  return (
    <div className="hidden sm:flex min-h-screen w-full">
      <SidebarMenu />
      <div className="w-full bg-secondary">
        <section className="max-w-7xl mx-auto">
          <Outlet />
        </section>
      </div>
    </div>
  )
}
