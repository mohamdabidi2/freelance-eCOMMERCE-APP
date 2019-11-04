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
class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isLoading: true,
      token: "",
      firstName: "",
      lastName: "",
      phone: null,
      email: "",
      password: "",
      confirmPassword: "",
      file: {}
    }

    this.save = this.save.bind(this);



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


  save() {
    let UserId = this.state.users[0]._id
    let ProductDescription = this.refs.ProductDescription.value
    let qte = this.refs.qte.value
    let prix = this.refs.prix.value
    let UserPhone = this.state.users[0].phone
    let category = this.refs.category.value ? this.refs.category.value : "ALL"

    let ProductName = this.refs.ProductName.value
    let newuser = { UserId: UserId, ProductDescription: ProductDescription, qte: qte, prix: prix, UserPhone: UserPhone, category: category, ProductName: ProductName }


    Axios.post("/api/products/add", newuser).then(res => {
      console.log(res.data)
    })

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
                <div className="dash-partie2">
                  <div></div>
                  <hr />
                  <p>معلومات حول المنتج</p>
                  <div className="acoutn">

                    <div className="inputs">
                      <input ref="ProductName" type="text" />
                      <select name="category" id="category" ref="category">
                        <option value="category1">category1</option>
                        <option value="category2">category2</option>
                        <option value="category3">category3</option>
                      </select>
                      <input ref="ProductDescription" type="text" />
                      <input ref="prix" type="text" />
                      <input ref="qte" type="Number" />


                    </div>
                    <div className="labels">
                      <label htmlFor="producttitle">إسم المنتج</label>
                      <label htmlFor="category">الفئة</label>
                      <label htmlFor="description">وصف المنتج</label>
                      <label htmlFor="price">ثمن المنتج</label>
                      <label htmlFor="qtn">الكمية المتوفرة</label>


                    </div>
                  </div>

                  <p onClick={this.save}>اضافة منتج جديد</p>
                </div>
              </div>

            )
          })
        }

      </div>
    )





  }
}

export default AddProduct;