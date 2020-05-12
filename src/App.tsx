import { CSSReset, ThemeProvider } from '@chakra-ui/core'
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Header } from './components/Header'
import { Home, CreateCommonArea, ListBooking } from './pages'
import { customTheme } from './theme'

const App: React.FC = () => {
  return (
      <Router>
        <ThemeProvider theme={customTheme}>
          <CSSReset />
          <Header />
          <Switch>
            <Route path='/commonArea'>
              <CreateCommonArea />
            </Route>
            <Route path='/'>
              <Home />
            </Route>

            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Steve Jobs</h5>
                <h6 className="card-subtitle mb-2 text-muted">steve@apple.com</h6>
                <p className="card-text">Stay Hungry, Stay Foolish</p>
              </div>
            </div>

          </Switch>
        </ThemeProvider>
      </Router>
  )
}

export default App
