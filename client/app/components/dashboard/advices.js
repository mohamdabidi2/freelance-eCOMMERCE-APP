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
class ForumAdvices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isLoading: true,
      token: "",
      advices:[],
      tre:false
    }

    this.addPost = this.addPost.bind(this);
    this.addComment = this.addComment.bind(this);



  }

  componentDidMount() {
    const obj = getFromStorage('the_main_app');
    if (obj && obj.email) {
      const { email } = obj;

      // Post request to backend
      Axios.get("api/account/users/" + email)
        .then(res => this.setState({ users: [res.data] }))
    }

     Axios.get("/api/advices/all")
        .then(res => this.setState({ advices: res.data }))



  }
  addComment(e){
this.props.history.push("/comment"+e)  }


  save() {
}
  setImage(e) {
  
  }


addPost(){
  const {firstName,lastName,_id,ProfileImg}=this.state.users[0]
  Axios.post("/api/post/add_one",{PostText:this.refs.PostText.value,UserId:_id,PostUserName:firstName+" "+lastName,userphoto:ProfileImg})
  .then(res=>console.log(res))
}

  render() {

    return (
    <div>    <LogedHeader logout={this.logout} />{
      this.state.advices.length <= 0 ? <div>isLoading...</div> :
<div>
    {this.state.advices.map(el=>{return(
        <div key={el._id}>
    <h1>{el.title}</h1>
    <p>{el.body}</p>
        </div>
    )})}
</div>}
</div>
      
    )




  }
}

export default ForumAdvices;