import React, { Fragment } from 'react'
import { Provider } from 'react-redux'

import GlobalStyle from './styles/global'
import Router from './routes'

import store from './store'

const App = () => {
  return <Fragment>
    <Provider store={store}>
      <Router />
      <GlobalStyle />
    </Provider>
  </Fragment>
}

export default App