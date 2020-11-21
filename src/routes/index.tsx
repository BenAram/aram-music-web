import React, { FC } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import App from '../pages/App'
import Landing from '../pages/Landing'

const Router: FC = () => <BrowserRouter>
    <Route exact path="/" component={Landing} />
    <Route path="/app" component={App} />
</BrowserRouter>

export default Router