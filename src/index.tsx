import React from 'react'
import ReactDOM from 'react-dom'
import { Provider as ReduxProvider } from 'react-redux'

import { App } from './App'
import { initFeatures } from './features'
import { addRoutes } from './routes'
import * as serviceWorker from './serviceWorker'
import { store } from './stores'
import { GlobalStyle } from './themed/global-style'

initFeatures({
  addLocal: store.dispatch.locale.addMsg,
  addRoutes,
})

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <GlobalStyle />
      <App />
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)

/*
 * If you want your app to work offline and load faster, you can change
 * unregister() to register() below. Note this comes with some pitfalls.
 * Learn more about service workers: https://bit.ly/CRA-PWA
 */
serviceWorker.unregister()
