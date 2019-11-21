import React, { Component } from 'react';
import Axios from 'axios';
class AdminDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentADmin: [],
            products: [],
            qte:"",
            search:"",
            min:0,
            max:100000,
        }
        this.filtercategory = this.filtercategory.bind(this);
    }
    componentDidMount() {
        Axios.get("/api/admin/" + this.props.match.params.id).then(res => this.setState({ currentADmin: res.data }))
        Axios.get("/api/products/all/")
        .then(res => this.setState({ products: res.data }))
    }
    filtercategory(){
        this.setState({
            qte:this.refs.category.value,
            max:this.refs.pricemax.value,
            min:this.refs.pricemin.value,
            search:this.refs.search.value
        
        
        })
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
                                   
                                    <p className="protitle">المنتجات</p>
                                </div>
                                <div className="publishs">

                                    <div>
                                        <input  className="adda3len" placeholder="بحث" ref="search" type="text" />
                                    </div>

                                    <div className="publishs-1">
                                        <p > تم النشر  <span>( {this.state.products.length} )</span></p>
                                        <p> الكل  <span>( {this.state.products.length} )</span></p>
                                    </div>


                                </div>
                                <div className="filters">
                                  
                                <p className="adda3len" onClick={this.filtercategory}>تطبيق</p>
                                    <input type="text" placeholder="اقل سعر" defaultValue="0"  ref="pricemin" name="" id="" className="adda3len"/>

<input type="text" placeholder="أكثر سعر"  defaultValue="10000000" ref="pricemax" name="" id="" className="adda3len"/>

                                    <select ref="category"  name="" id="" className="adda3len">
                                        <option value="">إختر صنف </option>
                                        <option value="category1">category1 </option>
                                        <option value="category2">category2 </option>

                                    </select>

                                </div>
                                <div className="titles">

                                    <p className="title-userfilter">التاريخ</p>
                                    <p className="title-userfilter">الصنف</p>
                                    <p className="title-userfilter">الثمن</p>
                                    <p className="title-userfilter">الكمية المتوفرة</p>
                                    <p className="title-userfilter">الأسم</p>
                                    <p className="title-userfilter">الصورة</p>
                                </div>
                                {/* {this.state.products.filter(el=>el.UserId==this.state.users[0]._id&&el.prix>this.state.min&& el.category.toUpperCase().includes(this.state.qte.toUpperCase())&&el.prix<this.state.max).map(el => { */}
                                    {this.state.products.filter(el=>el.ProductName.toUpperCase().includes(this.state.search.toUpperCase())&&el.prix>=Number(this.state.min)&& el.category.toUpperCase().includes(this.state.qte.toUpperCase())&&el.prix<=Number(this.state.max)).map(el => {
                                    return (
                                        <div className="products-conrntent">

                                            <p className="productu-j">{el.AddDate.substring(0, 15)}</p>
                                            <p className="productu-j">{el.category}</p>
                                            <p className="productu-j">{el.prix}</p>
                                            <p className="productu-j">{el.qte}</p>

                                            <p className="productu-j">{el.ProductName}</p>
                               
                                      <img src={el.photo} alt="" id="productu-j" />


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

export default AdminDashboard;