import React, { Component } from 'react';
import Axios from 'axios';
class FrontPhotos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentADmin: [],
            users: [],
            qte:"",
            search:"",
            photos:[],
            min:0,
            max:100000,
        }
        this.filtercategory = this.filtercategory.bind(this);


    }
    componentDidMount() {
        Axios.get("/api/admin/" + this.props.match.params.id).then(res => this.setState({ currentADmin: res.data }))
        Axios.get("/api/users/all")
        .then(res => this.setState({ users: res.data }))
        Axios.get("/api/photos/all").then(res => this.setState({ photos: res.data }))
    }
    filtercategory(){
        this.setState({
         
            search:this.refs.search.value
        
        
        })
            }
            deleteImg(e){
                Axios.delete("/api/photos/delete/"+e).then(res=>console.log(res))
            }
            addImage(e){
                const fd = new FormData()
                fd.append("img", e.target.files[0], e.target.files[0].name)
            
                Axios.post("/api/photos/add", fd).then(res => console.log(res))
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

                        </div>
                        <div className="admin-det">
                            <div className="dashboard-admin-all">
                                <p>{el.firstName} {el.lastName}</p>
                                <p>{el.email}</p>
                                <p>ADMIN</p>
                            </div>

                        </div>
                        <div className="partie2-ashboard-admin">
                            <div className="dash-partie222">
                      <div>
                          <h1>أضف صور جديدة</h1>
                      <label htmlFor="">  <input onChange={this.addImage.bind(this)} type="file" name="" id=""/></label>
                          <h1> الصور التي ستضهر</h1>
                            
                      {this.state.photos.map(el=>{
                          return(
                              <div>
                                  <img src={el.img} alt=""/><span className="adda3len" onClick={()=>this.deleteImg(el._id)}> remove</span>
                              </div>
                          )
                      })}

                      </div>
                      
                    
         

                        </div>
                        </div>






                    </div>
                )
            })}
        </div>);
    }
}

export default FrontPhotos;