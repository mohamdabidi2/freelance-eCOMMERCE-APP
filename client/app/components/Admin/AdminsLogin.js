import React, { Component } from 'react';
import Axios from 'axios';
class AdminLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
        this.adminLogin = this.adminLogin.bind(this);
    }
    adminLogin(){
        Axios.get("/api/admin/"+this.refs.adminemail.value+"/"+this.refs.adminpassword.value).then(
            res=>{if(res.data.success==true){
                console.log(res.data)
                this.props.history.push("/admin"+res.data.data[0]._id)
            }
            if(res.data.success==false){
                console.log("email mouch s7i7")
            }}
        )
    }
    render() { 
        return ( <div className="dashboardAdminLogin"> 
            <h1 className="dashboardAdminLogin-title"> &nbsp;&nbsp;&nbsp;&nbsp;Admin Login Dashboard</h1>
            <label htmlFor="">Email :   &nbsp;&nbsp;&nbsp;&nbsp; <input ref="adminemail" className="dashboardAdminLogin-email" type="text"/> </label>
            
            <label htmlFor="">password : <input ref="adminpassword" className="dashboardAdminLogin-password" type="text"/></label>
            
            <span className="dashboardAdminLogin-loginBTN adda3len" onClick={this.adminLogin}> Login</span>
        </div> );
    }
}
 
export default AdminLogin;