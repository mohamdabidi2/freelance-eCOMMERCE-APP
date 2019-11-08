import React, { Component } from 'react';
import Axios from 'axios';
import { BrowserRouter as Router, Route, Link,withRouter } from 'react-router-dom'

class ProductsTemp extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            products:[],
            qte:"",
            min:0,
            max:100000,
         }
        this.filtercategory = this.filtercategory.bind(this);
        this.productshow = this.productshow.bind(this);



    }
    componentDidMount(){
        Axios.get("/api/products/all").then(res=>this.setState({
            products:res.data
        }))
    }
    filtercategory(){
this.setState({
    qte:this.refs.category.value,
    max:this.refs.pricemax.value,
    min:this.refs.pricemin.value,


})
    }
    productshow(id){
      this.props.history.push('product='+id)
    }
    render() { 
        return ( <div>
                        <div className="filters">
                                        <p className="adda3len" onClick={this.filtercategory}>تطبيق</p>
                              
                                        <input type="text" placeholder="اقل سعر"   ref="pricemin" name="" id="" className="adda3len"/>

                                        <input type="text" placeholder="أكثر سعر"   ref="pricemax" name="" id="" className="adda3len"/>
                                
                                        <select ref="category" name="" id="" className="adda3len">
                                            <option defaultValue value="">إختر صنف</option>
                                            <option value="category1">category1 </option>
                                            <option value="category2">category2 </option>

                                        </select>

                                    </div>
            <div className="prodycti">
         

                {this.state.products.filter(el=>el.prix>=Number(this.state.min)&& el.category.toUpperCase().includes(this.state.qte.toUpperCase())&&el.prix<=Number(this.state.max))
                .map(el=>{return(
                    <div className="products-one-of" >
<img src={el.photo} className="prodfctimg" alt=""/>
<div className="product-info">
 <div className="product218">
 <p className="name-produc2ts">{el.ProductName}</p>
    <p >price : <span className="price-dproduct">{el.prix}</span> </p>
    <div className="product-line"></div>
 </div>
 <p className="more" onClick={()=>this.productshow(el._id)}>مزيد</p>
</div>
                    </div>
                )})}
            </div>
        </div>
         );
    }
}
 
export default withRouter( ProductsTemp);