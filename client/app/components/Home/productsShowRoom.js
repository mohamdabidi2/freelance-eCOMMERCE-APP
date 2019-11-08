import React, { Component } from 'react';
import Axios from 'axios';
import { BrowserRouter as Router, Route, Link,withRouter } from 'react-router-dom'
import LogedHeader from '../Header/LogedHeader';

class ProductShowRoom extends Component {
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
        return (    <div>    <LogedHeader logout={this.logout} />{
            this.state.products.length <= 0 ? <div>isLoading...</div> :
                <div className="tr6-9">
{this.state.products.filter(el=>el._id===this.props.match.params.id).map(el=>{return(
    <div className='productshowroom'>
    <img className="productshowroom-img"src={el.photo} alt=""/>
    <div>
        <p className="productshowroom-ProductName">{el.ProductName}</p>
        <p className="productshowroom-ProductName">{el.ProductDescription}</p>
        <p className="productshowroom-ProductName">{el.category}</p>
        <p className="productshowroom-ProductName">{el.qte}</p>
        <p className="productshowroom-ProductName">'{el.prix}'</p>
        <p className="productshowroom-ProductName">{el.UserPhone}</p>
        <p className="adda3len"> Message</p>


    </div>
</div>
)})}
                </div>
        }</div>

         );
    }
}
 
export default withRouter( ProductShowRoom);