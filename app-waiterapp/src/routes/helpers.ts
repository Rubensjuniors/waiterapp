import { createRoute } from '@tanstack/react-router'

export const createLayoutRoute = (id: string, component: any, parentRoute: any) => {
  return createRoute({
    getParentRoute: () => parentRoute,
    id,
    component,
  })
}

export const createPageRoute = (path: string, component: any, layoutRoute: any) => {
  return createRoute({
    getParentRoute: () => layoutRoute,
    path,
    component,
  })
}