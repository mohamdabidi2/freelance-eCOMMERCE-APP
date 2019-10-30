import React, { Component } from 'react';
import 'whatwg-fetch';
import "../../styles/styles.scss"
import { BrowserRouter as Router,withRouter, Route, Link } from 'react-router-dom'

import {
    setInStorage,
    getFromStorage,
  } from '../utils/storage';
import Dashboard from '../dashboard/dashboard';
import Header from '../Header/Header';
import LogedHeader from '../Header/LogedHeader';
import Orders from '../orders/order';
class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isLoading:true,
            signInError:"",
            signInEmail:"",
            signInPassword:"",
            token:""
         }
        this.onSignIn = this.onSignIn.bind(this);
        this.logout = this.logout.bind(this);
        this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
        this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
  
    }
    componentDidMount() {
        const obj = getFromStorage('the_main_app');
        if (obj && obj.token) {
          const { token } = obj;
          // Verify token
          fetch('/api/account/verify?token=' + token)
            .then(res => res.json())
            .then(json => {
              if (json.success) {
                this.setState({
                  token,
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
      onTextboxChangeSignInEmail(event) {
        this.setState({
          signInEmail: event.target.value,
        });
      }
    
      onTextboxChangeSignInPassword(event) {
        this.setState({
          signInPassword: event.target.value,
        });
      }
    
    onSignIn() {
        // Grab state
        const {
          signInEmail,
          signInPassword,
        } = this.state;
        this.setState({
          isLoading: true,
        });
        // Post request to backend
        fetch('/api/account/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: signInEmail,
            password: signInPassword,
          }),
        }).then(res => res.json())
          .then(json => {
            console.log('json', json);
            if (json.success) {
              setInStorage('the_main_app', { token: json.token,email:this.state.signInEmail ,ff:false });
              this.setState({
                signInError: json.message,
                isLoading: false,
                signInPassword: '',
            
                token: json.token,
              });
              
            } else {
              this.setState({
                signInError: json.message,
                isLoading: false,
              });
            }
          });
      }
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
    
    render() { 
        const {
            isLoading,
            token,
            signInError,
            signInEmail,
            signInPassword,
         
          } = this.state;
          if (isLoading) {
            return (<div><p>Loading...</p></div>);
          }
          if (!token) {
        return ( 
            
           <div>
             <Header/>
              <div className="login-login">
                 {
              (signInError) ? (
                <p>{signInError}</p>
              ) : (null)
            }
                <div className="login-form">
          
            <input onChange={this.onTextboxChangeSignInEmail} placeholder="البريد الإلكتروني" type="Email"/>
      
            <input  onChange={this.onTextboxChangeSignInPassword} placeholder="كلمة السر" type="password"/>
            <div>
                <span onClick={this.onSignIn} className="Login-btn">تسجل دخول</span>
             
            </div>
            <span>لا تملك حساب ؟ ,<span className="btn-btn-ml">سجل من هنا </span></span>
            </div>
            </div>
           </div>
         );
    }
    return (
        
        <div>
          {this.props.history.push("/dashboard")}
     
      
        
        </div>
      );
}
}
 
export default withRouter(SignIn);