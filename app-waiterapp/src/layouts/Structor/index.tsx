import { Navigate, Outlet } from '@tanstack/react-router'

import { useAuthContext } from '@/shared/contexts/AuthContext'

export default function StructorLayout() {
  const { isAuthenticated } = useAuthContext()

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" />
  }

  return (
    <>
      <div className="structor-layout">
        <div className="auth-container">
          <div className="auth-logo">
            <h1>StructorLayout</h1>
            <hr />
          </div>
          <div className="auth-content">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}
