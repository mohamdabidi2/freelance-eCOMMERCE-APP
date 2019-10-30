import React, { Component } from 'react';
import 'whatwg-fetch';
import "../../styles/styles.scss"
import Header from '../Header/Header';
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isLoading: true,
            token: '',
            signUpError: '',
            signUpEmail: '',
            signUpUserName: '',
            signUpfirstName: '',
            signUplastName: '',
            signUpPhone: null,
            signUpPassword:"",


         }
         this.onSignUp = this.onSignUp.bind(this);
         this.onTextboxChangesignUpEmail = this.onTextboxChangesignUpEmail.bind(this);
         this.onTextboxChangesignUpUserName = this.onTextboxChangesignUpUserName.bind(this);
         this.onTextboxChangesignUpfirstName = this.onTextboxChangesignUpfirstName.bind(this);
         this.onTextboxChangesignUplastName = this.onTextboxChangesignUplastName.bind(this);
         this.onTextboxChangesignUpPhone = this.onTextboxChangesignUpPhone.bind(this);
         this.onTextboxChangesignUpPassword = this.onTextboxChangesignUpPassword.bind(this);
         
         

    }
    componentDidMount() {
        this.setState({
          isLoading: false
        });
     }

    onSignUp() {
        // Grab state
        const {
            signUpEmail,
            signUpUserName,
            signUpfirstName,
            signUplastName,
            signUpPhone,
            signUpPassword,
        } = this.state;
    
        this.setState({
          isLoading: true,
        });
    
        // Post request to backend
        fetch('/api/account/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: signUpEmail,
            firstName:signUpfirstName ,
              lastName: signUplastName,
              userName: signUpUserName,
              phone: signUpPhone,
            password: signUpPassword,
          }),
        }).then(res => res.json())
          .then(json => {
            console.log('json', json);
            if (json.success) {
              this.setState({
                signUpError: json.message,
                isLoading: false,
                signUpEmail: '',
                signUpPassword: '',
                signUpUserName: '',
                signUpfirstName: '',
                signUplastName: '',
                signUpPhone: null
              });
            } else {
              this.setState({
                signUpError: json.message,
                isLoading: false,
              });
            }
          });
      }
      onTextboxChangesignUpEmail(event) {
        this.setState({
            signUpEmail: event.target.value,
        });
      }
      onTextboxChangesignUpPassword(event) {
        this.setState({
            signUpPassword: event.target.value,
        });
      }
      onTextboxChangesignUpUserName(event) {
        this.setState({
            signUpUserName: event.target.value,
        });
      }
      onTextboxChangesignUpfirstName(event) {
        this.setState({
            signUpfirstName: event.target.value,
        });
      }
      onTextboxChangesignUplastName(event) {
        this.setState({
            signUplastName: event.target.value,
        });
      }
      onTextboxChangesignUpPhone(event) {
        this.setState({
            signUpPhone: event.target.value,
        });
      }
    render() { 
        const {
            signUpEmail,
            signUpUserName,
            signUpfirstName,
            signUplastName,
            signUpPhone,
            signUpPassword,
        } = this.state;
        return (  <div>
          <Header/>
          
          <div className="login-login">
                <div className="login-form">
       
           
            <input  placeholder="الإسم" onChange={this.onTextboxChangesignUpfirstName} type="text"/>
 
            <input  placeholder="اللقب" onChange={this.onTextboxChangesignUplastName} type="text"/>
      
            <input  placeholder="إسم المستخدم" onChange={this.onTextboxChangesignUpUserName} type="text"/>

            <input placeholder="الرقم" onChange={this.onTextboxChangesignUpPhone} type="Number"/>
    
            <input  placeholder="البريد الإلكتروني" onChange={this.onTextboxChangesignUpEmail} type="email"/>
            
            <input   placeholder="كلمة السر" onChange={this.onTextboxChangesignUpPassword} type="password"/>
            
            <div>
                <span className="Login-btn" onClick={this.onSignUp}>تسجيل حساب جديد</span>
                </div>
                <span>تملك حسابا مسبقا ,<span className="btn-btn-ml">سجل الدخول من هنا</span></span>
            

            </div>
           </div>
        </div>
        );
    }
}
 
export default Register;