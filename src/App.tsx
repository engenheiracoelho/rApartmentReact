import {CSSReset, ThemeProvider} from '@chakra-ui/core'
import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {Header} from './components/Header'
import {CreateCommonArea, Home} from './pages'
import {customTheme} from './theme'

const App: React.FC = () => {
    return (
            <Router>
                <ThemeProvider theme={customTheme}>
                    <CSSReset />
                    <Header />
                    <Switch>
                        <Route path='/'>
                            <Home />
                        </Route>
                        <Route path='/commonArea'>
                            <CreateCommonArea />
                        </Route>
                    </Switch>
                </ThemeProvider>
            </Router>
    )
}

export default App

