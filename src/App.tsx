import { CSSReset, ThemeProvider } from '@chakra-ui/core'
import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Header } from './components/Header'
import { Feedback, ListCommonArea , Home} from './pages'
import { customTheme } from './theme'
import CommonArea from './components/commonArea'

class App extends Component {
    render() {
        return (
            <CommonArea commonArea={this.state.commonArea} />
        )
    }

    state = {
        commonArea: []
    };

    componentDidMount() {
        fetch('http://localhost:8080/commonArea')
            .then(res => res.json())
            .then((data) => {
                this.setState({ commonArea: data })
            })
            .catch(console.log)
    }
}

const AppReact: React.FC = () => {
    return (
        <Router>
            <ThemeProvider theme={customTheme}>
                <CSSReset />
                <Header />
                <Switch>
                    <Route path='/feedback'>
                        <Feedback />
                    </Route>
                    <Route path='/listCommonArea'>
                        <ListCommonArea />
                    </Route>
                    <Route path='/'>
                        <Home />
                    </Route>
                </Switch>
            </ThemeProvider>
        </Router>
    )
}

export default AppReact