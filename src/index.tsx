import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { hot } from 'react-hot-loader/root'
import { StoreContext } from 'storeon/react'

import { store } from 'store'
import { routes } from 'routes'
import 'styles/main.css'

const Root = hot(() => renderRoutes(routes))

render(
  <React.StrictMode>
    <StoreContext.Provider value={store}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Root />
      </BrowserRouter>
    </StoreContext.Provider>
  </React.StrictMode>,

  document.getElementById('app'),
)
