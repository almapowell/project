import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './Components/Home/Home'
import About from './Components/About/About'
import Films from './Components/Films/Films'
import Contact from './Components/Contact/Contact'
import Admin from './Components/Admin/Admin'

export default (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/films" component={Films} />
        <Route path="/contact" component={Contact} />
        <Route path="/admin" component={Admin} />
    </Switch>
)