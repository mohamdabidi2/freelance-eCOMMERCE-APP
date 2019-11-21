import React, { Component } from 'react';
import Axios from 'axios';
class Advices extends Component {
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
        this.filtercategory = this.filtercategory.bind(this);
   
        this.addAdvice = this.addAdvice.bind(this);


    }
    componentDidMount() {
        Axios.get("/api/admin/" + this.props.match.params.id).then(res => this.setState({ currentADmin: res.data }))
        Axios.get("/api/users/all")
        .then(res => this.setState({ users: res.data }))
    }
    filtercategory(){
        this.setState({
         
            search:this.refs.search.value
        
        
        })
            }
            addAdvice(){
                Axios.post("/api/advices/add",{title:this.refs.title.value,body:this.refs.body.value}).then(res=>console.log(res))
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
                            <div className="dash-partie22">
                           <label htmlFor="">Title    <input ref='title' className="adda3len" type="text"/></label>
                          <label htmlFor="">body      <textarea ref="body" className="adda3len" name="" id="" cols="30" rows="10"></textarea></label>
                        <p onClick={this.addAdvice}>Send</p>
                            </div>
                        </div>





                    </div>
                )
            })}
        </div>);
    }
}

export default Advices;