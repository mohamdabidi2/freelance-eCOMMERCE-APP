import React, { Component } from 'react';
import Axios from 'axios';
import { BrowserRouter as Router, Route, Link,withRouter } from 'react-router-dom'
import LogedHeader from '../Header/LogedHeader';
import {
    setInStorage,
    getFromStorage,
  } from '../utils/storage';
class ProductShowRoom extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            products:[],
            qte:"",
            min:0,
            messages:[],
            users:[],
            max:100000,
            etat:false
         }
        this.filtercategory = this.filtercategory.bind(this);
        this.productshow = this.productshow.bind(this);



    }
    componentDidMount(){
        const obj = getFromStorage('the_main_app');
        if (obj && obj.email) {
          const { email } = obj;
    
          // Post request to backend
          Axios.get("api/account/users/" + email)
            .then(res => this.setState({ users: [res.data] }))}
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


    setImage(e) {
        const fd = new FormData()
        fd.append("ProfileImg", e.target.files[0], e.target.files[0].name)

        Axios.put("/api/profile/users/" + this.state.users[0]._id, fd).then(res => console.log(res))
    }

    sendMsG() {
        console.log(this.props.match.params.id, this.props.match.params.UserId)
        Axios.post("/api/messages/" + this.state.users[0]._id+ "/" +this.state.products.filter(el=>el._id===this.props.match.params.id)[0].UserId, { messages:{ message:this.refs.message.value,id:this.state.users[0]._id} }).then(
            res => {
                this.setState({
                    messages: [res.data.message],
                    etat: false
         

                })
            }
        )
    }
    sendMessage() {
        console.log()
        Axios.put("/api/messages/" + this.state.messages[0]._id, { messages: [...this.state.messages[0].messages, { id: this.state.users[0]._id, message: this.refs.message.value }] }).then(res => console.log(res.data))
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
        <p className="adda3len"onClick={()=>this.setState({etat:true})}> ارسل رسالة</p>


    </div>
  
</div>
)})}
{this.state.etat?<div className="ddsz">
{this.state.messages.map(el=>{return(<div>
{el.messages.map(el=>{
    return(
      el.id===this.state.users[0]._id?<p>{el.id}</p>:<p>{el.id}</p>
    )
})}
                                    </div>)})}
                                    <input type="text" ref="message" />
                                   <p onClick={this.sendMsG.bind(this)}>send</p> 
</div>:<div></div>}
                </div>
        }</div>

         );
    }
}
 
export default withRouter( ProductShowRoom);