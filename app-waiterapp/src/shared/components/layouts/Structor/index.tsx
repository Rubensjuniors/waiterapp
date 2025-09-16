import { Outlet } from '@tanstack/react-router'

export default function StructorLayout() {
  return (
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
  )
}
