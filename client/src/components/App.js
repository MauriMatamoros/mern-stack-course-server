import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import * as actions from '../actions'

import Header from './Header'
import Landing from './Landing'
import Dashboard from './Dashboard'

class App extends React.Component {
    componentDidMount() {
        this.props.fetchUser()
    }
    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <div>
                        <Header />
                        <Switch>
                            <Route exact path="/" component={Landing}/>
                            <Route exact path="/surveys" component={Dashboard} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        )
    }
}

export default connect(null, actions)(App)