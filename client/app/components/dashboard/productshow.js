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
class ProductShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            products: [],
            isLoading: true,
            token: "",
            firstName: "",
            lastName: "",
            min:0,
            max:100000,
            search:"",
            qte:"",
            phone: null,
            email: "",
            password: "",
            confirmPassword: "",
            file: {}
        }

        this.setImage = this.setImage.bind(this);
        this.sc = this.sc.bind(this);



    }

    componentDidMount() {
        const obj = getFromStorage('the_main_app');
        if (obj && obj.email) {
            const { email } = obj;

            // Post request to backend
            Axios.get("api/account/users/" + email)
                .then(res => this.setState({ users: [res.data] }))

         
           
        }
      


       Axios.get("/api/products/all/")
                .then(res => this.setState({ products: res.data }))

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
    setImage() {
 
    }
    sc(e){
        const fd = new FormData()
    fd.append("photos", e.target.files[0], e.target.files[0].name)

    Axios.put("/api/products/product/" +e.target.placeholder, fd).then(res => console.log(res))
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
                                            <p onClick={()=>{this.props.history.push("/Dashboard")}}>الإعدادات</p>
                                            
                                        </div>
                                    </div>

                                </div>
                                <div className="dash-partie22">
                                    <div className="product-user">
                                        <p onClick={()=>{this.props.history.push("/AddProduct")}} className="adda3len">اضف إعلان</p>
                                        <p className="protitle">المنتجات</p>
                                    </div>
                                    <div className="publishs">

                                        <div>
                                            <input onChange={()=>  this.setState({search:this.refs.searchProduct.value})}  className="adda3len" placeholder="بحث" ref="searchProduct" type="text" />
                                        </div>

                                        <div className="publishs-1">
                                            <p onClick={this.setImage}> تم النشر  <span>( {this.state.products.length} )</span></p>
                                            <p> الكل  <span>( {this.state.products.length} )</span></p>
                                        </div>


                                    </div>
                                    <div className="filters">
                                        <p className="adda3len">تطبيق</p>
                                        <select ref="pricemin" className="adda3len" onChange={()=>  this.setState({min:this.refs.pricemin.value})} name="" id="" >
                                            <option  value="0">أقل سعر </option>
                                            <option value="100">100 DT </option>
                                            <option value="500">500 DT </option>
                                            <option value="600">600 DT </option>
                                            <option value="1000">1000 DT </option>
                                        </select>
                                        <select onChange={()=>  this.setState({max:this.refs.pricemax.value})} ref="pricemax" name="" id="" className="adda3len">
                                            <option defaultValue value="1000">أكثر سعر </option>
                                            <option value="0">0 DT </option>
                                            <option value="100">100 DT </option>
                                            <option value="500">500 DT </option>
                                            <option value="600">600 DT </option>

                                        </select>
                                        <select ref="category" name="" id="" className="adda3len">
                                            <option defaultValue value="">إختر صنف </option>
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
                                    {/* {this.state.products.filter(el=>el.UserId==this.state.users[0]._id&&el.prix>this.state.min&& el.category.toUpperCase().includes(this.state.qte.toUpperCase())&&el.prix<this.state.max).map(el => { */}{this.state.products.map(el=>{
                                        return (
                                            <div className="products-conrntent">

                                                <p className="productu-j">{el.AddDate.substring(0, 15)}</p>
                                                <p className="productu-j">{el.category}</p>
                                                <p className="productu-j">{el.prix}</p>
                                                <p className="productu-j">{el.qte}</p>
                                                
                                                <p className="productu-j">{el.ProductName}</p>
                                                {el.photo==="https://i.imgur.com/B4lpk1h.png"?
                                                <input type="file" name="photos" id="productu-j" placeholder={el._id} onChange={this.sc}/>:<img src={el.photo} alt="" id="productu-j" />}


                                            </div>
                                        )
                                    })}

                                </div>
                            </div>

                        )
                    })
                }

            </div>
        )




    }
}

export default ProductShow;