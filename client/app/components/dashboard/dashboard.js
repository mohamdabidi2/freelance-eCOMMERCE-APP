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
          {this.state.users.length<=0?   <div>isLoading...</div> :  
this.state.users.map(el=>{return(
  <div  className="dashboard-czs">

  <div className="dashbaad">
  <div className="dashdash">
  
   
          <div className="dashboard-content">
            <img src={el.ProfileImg} alt="" id="profile-pec"/>
          <p>{el.firstName} {el.lastName}</p>
      
  
          </div>
  
  <div className="dashboard-content">
    
  <p>اضف منتج جديد</p>
  <p>مشترياتك</p>
  <p>تصفح المنتجات</p>
  <p>الإعدادات</p>
  </div>
  </div>
  
  </div>
  <div className="dash-partie2">
  <p className="edit-info">تعديل المعلومات الشخصية</p>
  <div className="up-Img">
  <img src={el.ProfileImg} className="wrap" alt="" id="profile-pec"/>
  <div class="upload-btn-wrapper">
    <button class="btn">Upload a file</button>
    <input type="file" name="myfile" />
  </div>
  
  </div>
  <p className="account-info">معلومات الحساب</p>
  <div className="acoutn">
   
    <div className="inputs">
      <input placeholder={el.firstName} type="text"/>
      <input placeholder={el.lastName} type="text"/>
      <input placeholder={el.email}  type="email"/>
      <input placeholder={el.phone}  type="Number"/>
  
    </div>
    <div className="labels">
      <label htmlFor="firstname">الإسم</label>
      <label htmlFor="lastname">اللقب</label>
      <label htmlFor="email">البريد الإلكتروني</label>
      <label htmlFor="phone">الهاتف</label>
  
    </div>
  </div>
  <p>تغيير كلمة السر</p>
  <div  className="acoutn">
  
  <div className="inputs">
  <input type="text" className="passwords"/>
  <input type="text" className="passwords"/>
  </div>
  <div  className="labels">
      <label htmlFor="currpassword">كلمة السر الحالية</label>
      <label htmlFor="newpassword">كلمة السر الجديدة</label>
     
  
    </div>
  </div>
  <span>حفظ التغييرات</span>
  </div>
  </div>
  
)})
 }
  
     </div>
 )
    
           
           
   
    }
}
 
export default Dashboard;