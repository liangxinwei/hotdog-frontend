import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import { routes, modalRoutes } from '@/routes'
import { ErrorBoundary } from '@/routes/components/ErrorBoundary'
import { NestedRoute } from '@/routes/components/NestedRoute'

export const App = () => {
  const [sessionCreated, setSessionCreated] = useState(false)
  useEffect(() => {
    setSessionCreated(true)
  }, [])

  useEffect(() => {
    if (sessionCreated) {
      const loader = document.getElementById('app-loader')
      if (loader) {
        loader.remove()
      }
    }
  }, [sessionCreated])

  return (
    <Router>
      <ErrorBoundary>
        <NestedRoute routes={routes} modalRoutes={modalRoutes} />
      </ErrorBoundary>
    </Router>
  )
}
