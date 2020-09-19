import { lazy } from 'react'

import { $t } from '@/locales/LocaleProvider'
import { RouteConfig } from '@/routes'

export const routes: RouteConfig[] = [
  {
    path: 'my',
    getTitle: () => $t('首页'),
    component: lazy(() => import('./pages/My').then(m => ({ default: m.My }))),
  },
]
