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
class Massanger extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            isLoading: true,
            token: "",
            messages: [],
            file: {},
            etat: true
        }

        this.setImage = this.setImage.bind(this);
        this.save = this.save.bind(this);



    }

    componentDidMount() {
        const obj = getFromStorage('the_main_app');
        if (obj && obj.email) {
            const { email } = obj;

            // Post request to backend
            Axios.get("api/account/users/" + email)
                .then(res => {
                    this.setState({ users: [res.data] })
                })

        }




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
    setImage(e) {
        const fd = new FormData()
        fd.append("ProfileImg", e.target.files[0], e.target.files[0].name)

        Axios.put("/api/profile/users/" + this.state.users[0]._id, fd).then(res => console.log(res))
    }

    sendMsG() {
        console.log(this.props.match.params.id, this.props.match.params.UserId)
        Axios.post("/api/messages/" + this.props.match.params.id + "/" + this.props.match.params.UserId, { messages: this.refs.message.value }).then(
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
        Axios.put("/api/messages/" + this.state.messages[0]._id, { messages: [...this.state.messages, { id: this.state.messages[0]._id, message: this.refs.message.value }] }).then(res => console.log(res.data))
    }

    render() {

        return (
            <div>
                <LogedHeader logout={this.logout} />
                {this.state.users.length <= 0 ? <div>isLoading...</div> :
                    this.state.users.map(el => {
                        return (
                            <div>
                                <div>
                                    <p>{el.firstName} {el.lastName}</p>
                                    {this.state.messages.map(el=>{return(<div>
{el.messages.map(el=>{
    return(
      el.id===this.state.users[0]._id?<p>{el.id}</p>:<p>{el.id}</p>
    )
})}
                                    </div>)})}
                                    <input type="text" ref="message" />
                                    {this.state.etat ? <p onClick={this.sendMsG.bind(this)}>send</p> : <p onClick={this.sendMessage.bind(this)}>send</p>}
                                </div>

                            </div>
                        )
                    })}</div>)
    }
}




export default Massanger;