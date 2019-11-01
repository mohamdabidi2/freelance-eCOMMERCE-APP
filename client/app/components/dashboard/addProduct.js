import React, { Component } from 'react';
import Axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import FormData from 'form-data'
import 'whatwg-fetch';
import {
  setInStorage,
  getFromStorage,
} from '../utils/storage';
import Orders from '../orders/order';
import LogedHeader from '../Header/LogedHeader';
class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isLoading: true,
      token: "",
      firstName: "",
      lastName: "",
      phone: null,
      email: "",
      password: "",
      confirmPassword: "",
      file:{}
    }

   this.setImage = this.setImage.bind(this);
   this.save = this.save.bind(this);



  }
  
  componentDidMount() {
    const obj = getFromStorage('the_main_app');
    if (obj && obj.email) {
      const { email } = obj;

      // Post request to backend
      Axios.get("api/account/users/" + email)
        .then(res => this.setState({ users: [res.data] }))
    }




  }


  save(){
    let firstName=this.refs.firstname.value!=""?this.refs.firstname.value:this.refs.firstname.placeholder
    let lastName=this.refs.lastname.value!=""?this.refs.lastname.value:this.refs.lastname.placeholder
    let phone=this.refs.phone.value>null?this.refs.phone.value:this.refs.phone.placeholder
    let email=this.refs.email.value!=""?this.refs.email.value:this.refs.email.placeholder
    let password=this.refs.pass.value!=""?this.refs.pass.value:this.refs.pass.placeholder
    let confirmPassword=this.refs.confpass.value!=""?this.refs.confpass.value:this.refs.confpass.placeholder
    let newuser={firstName:firstName,lastName:lastName,phone:phone,email:email,password:confirmPassword}
console.log({firstName:firstName,lastName:lastName,phone:phone,email:email,password:confirmPassword})
Axios.put("/api/users/profile/"+this.state.users[0]._id,newuser).then(res=>console.log(res))
  }
  setImage(e){
   const fd=new FormData()
  
   fd.append("photos",e.target.files)

Axios.put("/api/photos/5dba7f3b72d6ca26c8499816",fd).then(res=>console.log(res)) }
 



  render() {

    return (
        <div>
          <LogedHeader logout={this.logout} />
          {this.state.users.length <= 0 ? <div>isLoading...</div> :
            this.state.users.map(el => {
              return (
                <div key={Math.random()} className="dashboard-czs">
  
                  <div className="dashbaad">
                    <div className="dashdash">
  
  
                      <div className="dashboard-content">
                        <img src={el.ProfileImg} alt="" id="profile-pec" />
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
                  <div></div>
                  <hr/>
                  <p>معلومات حول المنتج</p>
                  <div className="acoutn">

                    <div className="inputs">
                      <input placeholder={el.firstName} ref="ProductName"  type="text" />
                      <select name="category" id="category" ref="category">
                          <option value="category1">category1</option>
                          <option value="category2">category2</option>
                          <option value="category3">category3</option>
                      </select>
                      <input placeholder={el.email} ref="description"  type="text" />
                      <input placeholder={el.phone} ref="price"  type="text" />
                      <input placeholder={el.phone} ref="qtn"  type="Number" />


                    </div>
                    <div className="labels">
                      <label htmlFor="producttitle">إسم المنتج</label>
                      <label htmlFor="category">الفئة</label>
                      <label htmlFor="description">وصف المنتج</label>
                      <label htmlFor="price">ثمن المنتج</label>
                      <label htmlFor="qtn">الكمية المتوفرة</label>
                    

                    </div>
                  </div>
                  <p>اضف صورة للمنتج</p>
                  <div>
                      <input type="file" name="photos" onChange={this.setImage} className="file" multiple/>
                      <img src={el.ProfileImg} alt=""/>
                  </div>
              </div>
                </div>
  
              )
            })
          }
  
        </div>
      )
  




  }
}

export default AddProduct;