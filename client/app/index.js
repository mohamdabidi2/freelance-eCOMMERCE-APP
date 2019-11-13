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

import Register from './components/Register/Register.js';
import SignIn from './components/SignIn/SignIn';

import Home from './components/Home/Home';
import Orders from './components/orders/order';
import Dashboard from './components/dashboard/dashboard';
import LogedHome from './components/Home/LogedHome';
import AddProduct from './components/dashboard/addProduct';
import ProductShow from './components/dashboard/productshow';
import Forum from './components/dashboard/forum';
import AdminLogin from './components/Admin/AdminsLogin';
import AdminDashboard from './components/Admin/AdminDashboard';
import AdminDashboardUser from './components/Admin/adminusersdash';
import AddAdmin from './components/Admin/addAdmin';
import FrontPhotos from './components/Admin/Frontphotos';
import Comantaire from './components/dashboard/commentaire';
import productsShowRoom from './components/Home/productsShowRoom';
import Massanger from './components/Home/messanger';
import MessangerDashboard from './components/dashboard/messangerDashboard';


render((
  <Router>
    <App>
      
       
        <Route exact path="/" component={Home} />
        <Route exact path="/home" component={LogedHome} />
      
        <Route exact path="/Dashboard" component={Dashboard}/>
        <Route exact path="/AddProduct" component={AddProduct}/>
        <Route exact path="/products" component={ProductShow}/>
        <Route exact path="/Forum" component={Forum}/>
        <Route exact path="/AdmnDashS" component={AdminLogin}/>
        <Route exact path="/dashAdmin:id" component={AdminDashboardUser}/>
        <Route exact path="/addadmin:id" component={AddAdmin}/>
        <Route exact path="/addphotoadmin:id" component={FrontPhotos}/>
        <Route exact path="/comment:id" component={Comantaire}/>
        <Route exact path="/product=:id" component={productsShowRoom}/>
        <Route exact path="/:id messangerUser=:UserId" component={Massanger}/>
        <Route exact path="/dashboardMessanger=:id" component={MessangerDashboard}/>




        
        <Route exact path="/admin:id" component={AdminDashboard}/>




      



        <Route path="/register" component={Register } />
        <Route exact path="/account" component={SignIn} />
        <Route path="/Orders" component={Orders}/>
     


        
 
    </App>
  </Router>
), document.getElementById('app'));
