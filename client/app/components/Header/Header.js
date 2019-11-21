import React, { Component } from 'react';
import { BrowserRouter as Router,withRouter, Route, Link } from 'react-router-dom'

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
        this.signup = this.signup.bind(this);
        this.register = this.register.bind(this);
        this.home = this.home.bind(this);
    }
    signup(){
        this.props.history.push("/Register")
      
    }
    register(){
        this.props.history.push("/account")
    }
    home(){
        this.props.history.push("/")
    }
    render() { 
        
        return ( 
            <div className="home-header">
            <img onClick={this.home} id='logo' src="https://i.imgur.com/s1HADMW.png" alt="رمز الموقع"/>
                <input className="search" type="text" placeholder="بــــحـــث"/>
                <span onClick={()=>this.props.history.push("/account")}>بحث</span>

               
                <p className="register" onClick={this.signup}>تسجيل</p>
                <p className="register"onClick={this.register}>دخول</p>
            </div>
          
         );
    }
}
 
export default withRouter(Header);