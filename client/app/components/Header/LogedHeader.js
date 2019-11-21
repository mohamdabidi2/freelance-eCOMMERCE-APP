import React, { Component } from 'react';

import { BrowserRouter as Router, withRouter, Route, Link } from 'react-router-dom'
import {
  setInStorage,
  getFromStorage,
} from '../utils/storage';
import Axios from 'axios';
class LogedHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isLoading: true,
      token: ""
    }
    this.logout = this.logout.bind(this);
    this.Addproduct = this.Addproduct.bind(this);

    this.dash = this.dash.bind(this);
    this.orders = this.orders.bind(this);
    this.home = this.home.bind(this);
  }
  orders() {
    this.props.history.push("/Orders")

  }
  dash() {
    this.props.history.push("/dashboard")
  }
  home() {
    this.props.history.push("/home")
  }
  Addproduct() {
    this.props.history.push('/AddProduct')}
  logout() {
    this.setState({
      isLoading: true,
    });
    
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch('/api/account/logout?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.props.history.push('/')
            this.setState({
              token: '',
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false,
            });
          }
        });
    } else {
      this.setState({
        isLoading: false,
      });
    }
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
  render() {

    return (this.state.users.length<=0?<div>Hello</div>:<div className="hedrsd">
      
    <div className="home-header-loged">
      <img onClick={this.home} id='logo' src="https://i.imgur.com/s1HADMW.png" alt="رمز الموقع" />
      <input ref="bahth" className="search" type="text" placeholder="بــــحـــث" />
      <span onClick={()=>this.props.history.push("/search="+this.refs.bahth.value)}>بحث</span>
      <p className="Login-btn add-btn" onClick={this.Addproduct}>اضف إعلان جديد</p>
      <ul className="compte-ee"><li className="likedcompte" ><div>

        {this.state.users.map(el => {
          return (
            <img key={Math.random()} id="profil-image" src={el.ProfileImg} alt="" />
          )
        })}

      </div>
        <ul className='drop-menu'>
          <li onClick={this.dash}>لوحة التحكم</li>
          <li onClick={()=>this.props.history.push("/dashboardMessanger="+this.state.users[0]._id)}>الرسائل</li>

          <li >الإعدادات</li>
          <li onClick={()=>{this.props.history.push("/products")}}>منتجاتك</li>
          <li onClick={this.logout}>تسحيل الخروج</li>
        </ul></li>
      </ul>

    </div>

 
  </div> );
  }
}


export default withRouter(LogedHeader);