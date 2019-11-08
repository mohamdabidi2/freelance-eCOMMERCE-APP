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
class Dashboard extends Component {
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
      file: {}
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


  save() {
    let firstName = this.refs.firstname.value != "" ? this.refs.firstname.value : this.refs.firstname.placeholder
    let lastName = this.refs.lastname.value != "" ? this.refs.lastname.value : this.refs.lastname.placeholder
    let phone = this.refs.phone.value > null ? this.refs.phone.value : this.refs.phone.placeholder
    let email = this.refs.email.value != "" ? this.refs.email.value : this.refs.email.placeholder
    let password = this.refs.pass.value != "" ? this.refs.pass.value : this.refs.pass.placeholder
    let confirmPassword = this.refs.confpass.value != "" ? this.refs.confpass.value : this.refs.confpass.placeholder
    let newuser = { firstName: firstName, lastName: lastName, phone: phone, email: email, password: confirmPassword }
    console.log({ firstName: firstName, lastName: lastName, phone: phone, email: email, password: confirmPassword })
    Axios.put("/api/users/profile/" + this.state.users[0]._id, newuser).then(res => console.log(res))
  }
  setImage(e) {
    const fd = new FormData()
    fd.append("ProfileImg", e.target.files[0], e.target.files[0].name)

    Axios.put("/api/profile/users/" + this.state.users[0]._id, fd).then(res => console.log(res))
  }




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


                    <p onClick={()=>{this.props.history.push("/products")}}>منتجاتك</p>
                                            <p onClick={()=>{this.props.history.push("/home")}}>تصفح المنتجات</p>
                                            <p>النصائح و الإرشادات</p>
                                            <p onClick={()=>{this.props.history.push("/Forum")}}>المنتدى</p>

                                            <p onClick={()=>{this.props.history.push("/Dashboard")}}>الإعدادات</p>
                    </div>
                  </div>

                </div>
                <div className="dash-partie2">
                  <p className="edit-info">تعديل المعلومات الشخصية</p>
                  <div className="up-Img">
                    <img src={el.ProfileImg} className="wrap" alt="" id="profile-pec" />
                    <div className="upload-btn-wrapper">
                      <button className="btn">Upload a file</button>
                      <input name="ProfileImg" ref="file" onChange={this.setImage} type="file" name="myfile" />
                    </div>

                  </div>
                  <p className="account-info">معلومات الحساب</p>
                  <div className="acoutn">

                    <div className="inputs">
                      <input placeholder={el.firstName} ref="firstname" type="text" />
                      <input placeholder={el.lastName} ref="lastname" type="text" />
                      <input placeholder={el.email} ref="email" type="email" />
                      <input placeholder={el.phone} ref="phone" type="Number" />

                    </div>
                    <div className="labels">
                      <label htmlFor="firstname">الإسم</label>
                      <label htmlFor="lastname">اللقب</label>
                      <label htmlFor="email">البريد الإلكتروني</label>
                      <label htmlFor="phone">الهاتف</label>

                    </div>
                  </div>
                  <p>تغيير كلمة السر</p>
                  <div className="acoutn">

                    <div className="inputs">
                      <input ref='pass' onChange={this.setPassword} type="password" className="passwords" />
                      <input ref="confpass" type="password" className="passwords" onChange={this.setConfirm} />
                    </div>
                    <div className="labels">
                      <label htmlFor="currpassword">كلمة السر الحالية</label>
                      <label htmlFor="newpassword">كلمة السر الجديدة</label>


                    </div>
                  </div>
                  <span onClick={this.save}>حفظ التغييرات</span>
                </div>
              </div>

            )
          })
        }

      </div>
    )




  }
}

export default Dashboard;