import { useCallback } from 'react'

import { RouteNode } from '@/routes'

export const useRouteAuthorization = () => {
  return useCallback((route: RouteNode) => {
    return !!route.path
  }, [])
}
