import { Outlet } from '@tanstack/react-router'

export default function AuthLayout() {
  return (
    <div className="auth-layout">
      <div>
        <div>
          <h1>AuthLayout</h1>
          <hr />
        </div>
        <div className="auth-content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
