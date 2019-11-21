import React, { Component } from 'react';
import Axios from 'axios';
class AdminDashboardUser extends Component {
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
        this.deleteUser = this.deleteUser.bind(this);

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
            deleteUser(e){
                Axios.delete("/api/users/delete/"+e).then(res=>console.log(res))
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
                                <div className="product-user">
                                   
                                    <p className="protitle">المستخدمين</p>
                                </div>
                                <div className="publishs">

                                    <div>
                                        <input  className="adda3len" placeholder="بحث" ref="search" type="text" />
                                    </div>

                                    <div className="publishs-1">
                                        <p > تم النشر  <span>( {this.state.users.length} )</span></p>
                                        <p> الكل  <span>( {this.state.users.length} )</span></p>
                                    </div>


                                </div>
                                <div className="filters">
                                  
                                <p className="adda3len" onClick={this.filtercategory}>تطبيق</p>
                         
<br/>
<br/>

<br/>


                                </div>
                                <div className="titles">

                                    <p className="title-userfilter" >حذف</p>
                                    <p className="title-userfilter">الهاتف</p>
                                    <p className="title-userfilter">الإمايل</p>
                                    <p className="title-userfilter">اللقب</p>
                                    <p className="title-userfilter">الأسم</p>
                                    <p className="title-userfilter">الصورة</p>
                                </div>
                                {/* {this.state.products.filter(el=>el.UserId==this.state.users[0]._id&&el.prix>this.state.min&& el.category.toUpperCase().includes(this.state.qte.toUpperCase())&&el.prix<this.state.max).map(el => { */}
                                    {this.state.users.filter(el=>el.firstName.toUpperCase()+" "+el.lastName.toUpperCase().includes(this.state.search.toUpperCase())).map(el => {
                                    return (
                                        <div className="products-conrntent">
                                            <p className="productu-j"><span className="adda3len" onClick={()=>this.deleteUser(el._id)}>حذف المستخدم</span></p>

                                            <p className="productu-j">{el.phone}</p>
                                            <p className="productu-j">{el.email}</p>
                                            <p className="productu-j">{el.lastName}</p>
                                            <p className="productu-j">{el.firstName}</p>

                                           
                               
                                      <img src={el.ProfileImg} alt="" id="productu-j" />


                                        </div>
                                    )
                                })}

                            </div>
                        </div>





                    </div>
                )
            })}
        </div>);
    }
}

export default AdminDashboardUser;