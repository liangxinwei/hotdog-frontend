import React, { Suspense } from 'react'
import { Redirect, RedirectProps, Route, Switch } from 'react-router-dom'

import { RouteNode, ModalRouteNode, useRouteAuthorization } from '@/routes'

export const NestedRoute: React.FC<{
  routes?: RouteNode[]
  modalRoutes?: ModalRouteNode[]
  redirect?: RedirectProps
}> = ({ routes = [], redirect = { to: '/404' }, ...params }) => {
  const authRoute = useRouteAuthorization()

  return (
    <Suspense fallback="loading">
      <Switch>
        {routes.map((route: RouteNode) => (
          <Route
            key={route.path}
            path={route.path}
            exact={route.exact}
            render={props => {
              return authRoute(route) ? (
                <route.component {...props} route={route} {...params} />
              ) : (
                <Redirect to="/403" />
              )
            }}
          />
        ))}
        <Redirect {...redirect} />
      </Switch>
    </Suspense>
  )
}
