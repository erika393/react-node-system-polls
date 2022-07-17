import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './pages/Home'
import Vote from './pages/Vote'
import Poll from './pages/Poll'
import Details from './pages/Poll/details'
import Header from './components/Header'

export default function Routes(){
    return(
        <Router>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/vote/:pollId" exact component={Vote}/>
                <Route path="/poll/new" exact component={Poll}/>
                <Route path="/details/:pollId" exact component={Details}/>
            </Switch>
        </Router>
    )
}