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
class Forum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isLoading: true,
      token: "",
      posts:[],
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

     Axios.get("/api/posts/all")
        .then(res => this.setState({ posts: res.data }))



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
      this.state.users.length <= 0 ? <div>isLoading...</div> :
      <div className="tr6-9">
     
          { this.state.users.map(el=>{return(
          <div className="tout-forum">
            <div className="part2">
            <div className="creationPost">
               <input type="text" className="post-text" ref="PostText"/>
               <p className="lab-text" onClick={this.addPost}>أنشر</p>
    
           </div>
           {this.state.posts.map(item=>{return(
             <div className="post">
               <div className="postuser">
               <p className="userName">{item.PostUserName}</p>
                 <img className="userimg" src={item.userphoto} alt=""/>
          
               </div>
               <div className="postContent">
                <p className="postText">{item.PostText}</p>

               </div>
               <div className="post-btn">
               <p onClick={()=>this.addComment(item._id)}>تعليق</p>   
                  <p>اعجبني</p>
                          
               </div>
          
      
             <div className="postContent1">
             
              {item.comments.map(el=>{return(<div className="postuser">
                <p className="userName">{el.commenttext}</p>
                 <img className="userimg1" src={el.commentuserphoto} alt=""/>
              </div>)})}
          
               
               
             </div>
             </div>
           )})}
            </div>
            <div className="part1">
            <div className="profile-div-how">
           <div className="bg"></div>
    <div className="img-ds">
    <img className="photo-profile-forum" src={el.ProfileImg} alt=""/>
    
    </div>
           <h1 className="name-User">{el.firstName.toUpperCase()} {el.lastName.toUpperCase()}</h1>
           <p className="phone-of-post"> Phone : {el.phone}</p>
           <p className="number-of-post">{5000} Posts</p>
    
           <p className="number-of-likes">{1000} Likes</p>
       </div>
            </div>
          </div>
         )})}
      </div>
    }</div>
      
    )




  }
}

export default Forum;