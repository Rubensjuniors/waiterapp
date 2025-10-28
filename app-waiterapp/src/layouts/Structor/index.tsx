import { Link, Navigate, Outlet } from '@tanstack/react-router'
import { CircleUserRound, House, LogOut, NotebookText, SquareMenu, UsersRound } from 'lucide-react'

import { cn } from '@/lib/utils'
import { useAuthContext } from '@/shared/contexts/AuthContext'

export default function StructorLayout() {
  const { isAuthenticated } = useAuthContext()

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" />
  }

  const menuLinks = [
    { to: '/', label: 'Home', icon: <House /> },
    { to: '/historico', label: 'Histórico', icon: <SquareMenu /> },
    { to: '/cardapio', label: 'Cardápio', icon: <NotebookText /> },
    { to: '/usuarios', label: 'Usuários', icon: <UsersRound /> },
  ]

  return (
    <div className="hidden sm:flex min-h-screen w-full">
      <div className="flex flex-col justify-between items-center w-24 p-2 py-8">
        <div>
          <Link to="/">
            <img className="mx-auto" src="/icons/simply-logo.svg" alt="Logo simples" />
          </Link>

          <nav className="mt-14 flex flex-col items-center gap-6 w-24">
            {menuLinks.map((item) => (
              <Link key={item.to} to={item.to} className="p-5">
                {({ isActive }) => (
                  <div
                    className={cn(
                      'flex flex-col items-center gap-4 text-muted-foreground hover:text-primary',
                      {
                        'text-primary': isActive,
                      },
                    )}
                  >
                    <span>{item.icon}</span>
                    <span className="text-sm">{item.label}</span>
                    {isActive && <div className="w-3 h-[3px] bg-primary" />}
                  </div>
                )}
              </Link>
            ))}
          </nav>
        </div>

        <footer className="flex flex-col items-center gap-8">
          <button className="flex flex-col items-center gap-4 text-muted-foreground hover:text-primary cursor-pointer">
            <CircleUserRound />
            <span className="text-sm w-full">Meu Perfil</span>
          </button>
          <button className="flex flex-col items-center gap-4 text-muted-foreground hover:text-primary cursor-pointer">
            <LogOut />
            <span>Sair</span>
          </button>
        </footer>
      </div>
      <div className="w-full bg-secondary">
        <Outlet />
      </div>
    </div>
  )
}
