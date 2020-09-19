import { lazy } from 'react'

import { $t } from '@/locales/LocaleProvider'
import { RouteConfig } from '@/routes'

export const routes: RouteConfig[] = [
  {
    path: '/',
    getTitle: () => $t('首页'),
    component: lazy(() => import('./pages/Home').then(m => ({ default: m.Home }))),
  },
]
