import React, { FC } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import App from '../pages/App'
import Landing from '../pages/Landing'
import NotFound from '../pages/NotFound'

const Router: FC = () => <BrowserRouter>
    <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/app" component={App} />
        <Route path="/" component={NotFound} />
    </Switch>
</BrowserRouter>

export default Router