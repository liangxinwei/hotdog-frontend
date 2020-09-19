import { lazy } from 'react'

import { $t } from '@/locales/LocaleProvider'

import { RouteNode, ModalRouteNode, RouteConfig } from './types'
import { convertRoutes, sortRoutes } from './utils'

export * from './types'
export * from './hooks'
export * from './utils'

export const routes: RouteNode[] = [
  convertRoutes({
    path: '404',
    component: lazy(() => import('../components/NotFound').then(m => ({ default: m.NotFound }))),
    getTitle: () => $t('找不到页面'),
  }),
  convertRoutes({
    path: '403',
    component: lazy(() =>
      import('../components/NotAllowed').then(m => ({ default: m.NotAllowed })),
    ),
    getTitle: () => $t('无访问权限'),
  }),
]

export const modalRoutes: ModalRouteNode[] = []

export const addRoutes = (newRoutes?: RouteConfig[], newModalRoutes?: ModalRouteNode[]) => {
  if (newRoutes) {
    routes.push(...newRoutes.map(v => convertRoutes(v)))
    sortRoutes(routes)
  }
  if (newModalRoutes) {
    modalRoutes.push(...newModalRoutes)
  }
}
