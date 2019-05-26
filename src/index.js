import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { MuiThemeProvider } from '@material-ui/core/styles'

import indexRoutes from './routes'
import theme from './styles/theme'
import store from './store'
import './styles'
import history from './helpers/history'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<div />, document.getElementById('root'), () => {
  ReactDOM.render(
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <Router history={history}>
          <Switch>
            {indexRoutes.map((route, key) =>
              <Route
                exact
                key={key}
                path={route.path}
                component={route.component} />
            )}
          </Switch>
        </Router>
      </MuiThemeProvider>
    </Provider>,
    document.getElementById('root'))
})

registerServiceWorker()
