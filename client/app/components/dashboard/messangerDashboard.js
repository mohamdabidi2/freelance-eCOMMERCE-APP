import React, { Component } from 'react';
import Axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import FormData from 'form-data'
import 'whatwg-fetch';
import {
  setInStorage,
  getFromStorage,
} from '../utils/storage';
import MessangerDashboard from '../orders/order';
import LogedHeader from '../Header/LogedHeader';
class MessangerDahboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isLoading: true,
      token: "",
      AllUsers:[],
      singleMsg:[],
      messages:[]


    }

    this.setImage = this.setImage.bind(this);
    this.givememsg = this.givememsg.bind(this);

    this.logout = this.logout.bind(this);
    this.Addproduct = this.Addproduct.bind(this);

    this.dash = this.dash.bind(this);
    this.orders = this.orders.bind(this);
    this.home = this.home.bind(this);
  }
  orders() {
    this.props.history.push("/Orders")

  }
  dash() {
    this.props.history.push("/dashboard")
  }
  home() {
    this.props.history.push("/home")
  }
  Addproduct() {
    this.props.history.push('/AddProduct')}
  logout() {
    this.setState({
      isLoading: true,
    });}
    

  componentDidMount() {
    const obj = getFromStorage('the_main_app');
    if (obj && obj.email) {
      const { email } = obj;

      // Post request to backend
      Axios.get("api/account/users/" + email)
        .then(res => this.setState({ users: [res.data] }))
    }
    Axios.get("/api/users/all")
    .then(res => this.setState({ AllUsers: res.data }))
    Axios.get("/api/messages/"+this.props.match.params.id )
    .then(res => this.setState({ messages:res.data}))




  }


  givememsg(e) {
    
    Axios.get("/api/Singlemessages/"+e._id)
    .then(res => {console.log(res.data)
      this.setState({ singleMsg:res.data})})

  }
  setImage(e) {
    const fd = new FormData()
    fd.append("ProfileImg", e.target.files[0], e.target.files[0].name)

    Axios.put("/api/profile/users/" + this.state.users[0]._id, fd).then(res => console.log(res))
  }

  sendMessage() {
    console.log(this.state.singleMsg)
    Axios.put("/api/messages/" + this.state.singleMsg[0]._id, { messages: [...this.state.singleMsg[0].messages, { id: this.state.users[0]._id, message: this.refs.message.value }] }).then(res =>  console.log(res.data))

  }



  render() {

    return (this.state.users.length<=0?<div>Hello</div>:
      <div className="developeme">
       {this.state.users.map(user=>{return(
         <div className="d">
           <div className="messangerHeader">
            <div className="headerMsgItems">
            <ul className="compte-ee headerMsgItems"><li className="likedcompte" ><div>
    <img key={Math.random()} id="profil-image" src={user.ProfileImg} alt="" />
</div>
<ul className='drop-menu'>
  <li onClick={this.dash}>لوحة التحكم</li>
  <li >الإعدادات</li>
  <li onClick={()=>{this.props.history.push("/products")}}>منتجاتك</li>
  <li onClick={this.logout}>تسحيل الخروج</li>
</ul></li>
</ul>
            </div>
             <p className="headerMsgItems msdfs">الرسائل</p>
             <div className="headerMsgItems">      <img onClick={this.home} id='logo' src="https://i.imgur.com/s1HADMW.png" alt="رمز الموقع" /></div>

            
           </div>
         </div>
       )})}

       <section className="mesages5">
         <div className="messagesall">
           {this.state.messages.map(message=>{return(
             <div className="singleMessage" onClick={()=>{this.givememsg(message)}}>
                <img className="singleMesgIMG" src={this.state.AllUsers.filter(el=>el._id===message.senderId).map(el=>el.ProfileImg)} alt=""/>
           <p>{this.state.AllUsers.filter(el=>el._id===message.senderId).map(el=>el.firstName+" "+ el.lastName)}</p>
             
             </div>
           )})}
         </div>
         <div className="messageone">
{this.state.singleMsg.map(message=>{return(
  <div>
 {message.messages.map(el=>{return(
<div>
{el.id===this.state.users[0]._id?             <div className="singleMessage1">   <img className="singleMesgIMG" src={this.state.users[0].ProfileImg} alt=""/>
<p>{el.message}</p></div>:<div className="singleMessage2">
<p>{el.message}</p>
<img className="singleMesgIMG" src={this.state.AllUsers.filter(item=>el.id===item._id).map(el=>el.ProfileImg)} alt=""/>
 
</div>}
</div>

 
 )})}

  </div>
  
)})} <div className="sendmessahge">
  <span onClick={this.sendMessage.bind(this)}>ارسل</span>
  <input placeholder="أكتب رسالة" ref="message" className="sendall" type="text"/>

</div>
         </div>
       </section>
      </div>
    )




  }
}

export default MessangerDahboard;