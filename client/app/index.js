import React from 'react';
import { render } from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import App from './components/App/App';


import './styles/styles.scss';
import Header from './components/Header/Header.js';
import Register from './components/Register/Register.js';
import SignIn from './components/SignIn/SignIn';

import Home from './components/Home/Home';
import Orders from './components/orders/order';
import Dashboard from './components/dashboard/dashboard';
import LogedHome from './components/Home/LogedHome';

render((
  <Router>
    <App>
      
       
        <Route exact path="/" component={Home} />
        <Route exact path="/home" component={LogedHome} />
      
        <Route exact path="/Dashboard" component={Dashboard}/>

        <Route path="/register" component={Register } />
        <Route exact path="/account" component={SignIn} />
        <Route path="/Orders" component={Orders}/>
     


        
 
    </App>
  </Router>
), document.getElementById('app'));
