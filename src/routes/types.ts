import { LazyExoticComponent, FunctionComponent } from 'react'

import { RoleEnum, PermissionNameEnum } from '@/sdk'

export type RouteComponent = LazyExoticComponent<FunctionComponent<any>>

export type ModalRouteNode = {
  asModal: string
  getTitle: () => string
  component: RouteComponent
}

export type RouteConfig = {
  path: string
  getTitle: () => string
  component: RouteComponent
  requiredPermissions?: PermissionNameEnum[]
  requireRoles?: RoleEnum[]
  subRoutes?: RouteNode[]
}

export type RouteNode = RouteConfig & {
  exact?: boolean
  parentPath?: string
}

export interface Query {
  [key: string]: any
}

export enum ModalMode {
  Push = 'push',
  Replace = 'replace',
}

export const MODAL_QUERY_NAMESPACE = 'modalQuery'
