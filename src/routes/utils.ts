import { RouteConfig, RouteNode } from './types'

export const convertRoutes = (route: RouteNode, parentPath?: string): RouteNode => {
  const path = `${parentPath || ''}/${route.path}`
  const { subRoutes, ...otherConfig } = route
  const converted: RouteNode = {
    ...otherConfig,
    path,
    exact: !route.subRoutes,
    parentPath,
  }
  if (subRoutes) {
    converted.subRoutes = subRoutes.map<RouteNode>(v => convertRoutes(v, path))
  }
  return converted
}

/**
 * 对 routes 进行排序，当两个 route.path 之间是包含关系时，让更具体的 route 在先，更泛的在后
 */
export const sortRoutes = (_routes: RouteConfig[]) => {
  const pattern = new RegExp(':[^/]+', 'g')
  _routes.sort((current, prev) => {
    const modifiedCurrentPath = current.path.replace(pattern, ':')
    const modifiedPrevPath = prev.path.replace(pattern, ':')

    if (modifiedCurrentPath.startsWith(modifiedPrevPath)) return -1
    if (modifiedPrevPath.startsWith(modifiedCurrentPath)) return 1

    // 毫无关系的 route 之间保持原序
    return 0
  })
  return _routes
}
