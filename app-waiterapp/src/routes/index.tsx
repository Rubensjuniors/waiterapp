import { createRootRoute, createRoute, createRouter, Outlet } from '@tanstack/react-router'
import { lazy } from 'react'

const AuthLayout = lazy(() => import('../layouts/Auth'))
const StructorLayout = lazy(() => import('../layouts/Structor'))

const SignIn = lazy(() => import('../pages/Auth/SignIn'))
const Home = lazy(() => import('../pages/Home'))
const History = lazy(() => import('../pages/History'))
const Menu = lazy(() => import('../pages/Menu'))

const rootRoute = createRootRoute({
  component: () => <Outlet />,
  notFoundComponent: () => <div>Not Found 404</div>,
})

// ===== LAYOUTS =====
const authLayout = createRoute({
  getParentRoute: () => rootRoute,
  id: 'auth-layout',
  component: AuthLayout,
})

const structorLayout = createRoute({
  getParentRoute: () => rootRoute,
  id: 'structor-layout',
  component: StructorLayout,
})

// ===== PAGES =====
const signInRoute = createRoute({
  getParentRoute: () => authLayout,
  path: '/sign-in',
  component: SignIn,
})

const home = createRoute({
  getParentRoute: () => structorLayout,
  path: '/',
  component: Home,
})

const history = createRoute({
  getParentRoute: () => structorLayout,
  path: '/historico',
  component: History,
})

const menu = createRoute({
  getParentRoute: () => structorLayout,
  path: '/cardapio',
  component: Menu,
})

const user = createRoute({
  getParentRoute: () => structorLayout,
  path: '/usuarios',
  component: Home,
})

const routeTree = rootRoute.addChildren([
  authLayout.addChildren([signInRoute]),
  structorLayout.addChildren([home, history, menu, user]),
])

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
