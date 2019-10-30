import React, { Component } from 'react';
import Axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import 'whatwg-fetch';
import {
    setInStorage,
    getFromStorage,
  } from '../utils/storage';
import Orders from '../orders/order';
import LogedHeader from '../Header/LogedHeader';
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users:[],
            isLoading:true,
            token:""
          }
 

    }
    componentDidMount(){
        const obj = getFromStorage('the_main_app');
        if (obj && obj.email) {
          const { email } = obj;
       
         // Post request to backend
       Axios.get("api/account/users/"+email)
       .then(res=>this.setState({users:[res.data]}))}
      



    }
   
    render() { 

 return(
     <div>
       <LogedHeader logout={this.logout}/>
          {this.state.users.length<=0?   <div>isLoading...</div> :   <div>

<div className="dashdash">
{this.state.users.map(el=>{
    return(
        <div className="dashboard-content">
          <img src={el.ProfileImg} alt="" id="profile-pec"/>
        <p>{el.firstName} {el.lastName}</p>
    

        </div>
    )
})}
<div className="dashboard-content">
  
<p>اضف منتج جديد</p>
<p>مشترياتك</p>
<p>تصفح المنتجات</p>
<p>الإعدادات</p>
</div>
</div>




  </div> }
     </div>
 )
    
           
           
   
    }
}
 
export default Dashboard;