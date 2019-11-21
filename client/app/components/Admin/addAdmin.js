import React, { Component } from 'react';
import Axios from 'axios';
class AddAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentADmin: [],
            users: [],
            qte:"",
            search:"",
            min:0,
            max:100000,
        }
       
        this.addAdmin = this.addAdmin.bind(this);

    }
    componentDidMount() {
        Axios.get("/api/admin/" + this.props.match.params.id).then(res => this.setState({ currentADmin: res.data }))

    }
    
    addAdmin(){
const {firstName,lastName,email,password}=this.refs
                Axios.post("/api/admin/add",{firstName:firstName.value,lastName:lastName.value,email:email.value,password:password.value}).then(res=>console.log(res))
            }
    render() {
        return (this.state.currentADmin.length <= 0 ? <div>Loading ...</div> : <div>
            {this.state.currentADmin.map(el => {
                return (
                    <div className="dashboard-admin-all-all">
                                        <div className="headeradmin">

<p className="adda3len" onClick={()=>{this.props.history.push("/dashAdmin"+this.props.match.params.id)}}>قائمة المستخدمين</p>
<p className="adda3len" onClick={()=>{this.props.history.push("/admin"+this.props.match.params.id)}}>قائمة المنتوجات</p>
<p className="adda3len" onClick={()=>{this.props.history.push("/addadmin"+this.props.match.params.id)}}>اضافة ادمن جديد</p>
<p className="adda3len" onClick={()=>{this.props.history.push("/addphotoadmin"+this.props.match.params.id)}}>اضافة صور الواجهة</p>
<p className="adda3len" onClick={()=>{this.props.history.push("/advices"+this.props.match.params.id)}}>نصائح و إرشادات</p>


</div>
                        <div className="admin-det">
                            <div className="dashboard-admin-all">
                                <p>{el.firstName} {el.lastName}</p>
                                <p>{el.email}</p>
                                <p>ADMIN</p>
                            </div>

                        </div>
                        <div className="partie2-ashboard-admin">
                            <div className="dash-partie222">
                                <h1>اضافة ادمن جديد</h1>
                            <div className="inputs-admins">
                          <input className="inputs-admin adda3len"placeholder="first Name" type="text" ref="firstName"/>
                          <input className="inputs-admin adda3len"placeholder="last Name" type="text" ref="lastName"/>
                          <input className="inputs-admin adda3len"placeholder="email" type="email" ref="email"/>
                          <input className="inputs-admin adda3len"placeholder="password" type="password" ref="password"/>

                          
                      </div>
                      <p className="adda3len" onClick={this.addAdmin}>اضافة</p>
                            </div>
                        </div>





                    </div>
                )
            })}
        </div>);
    }
}

export default AddAdmin;