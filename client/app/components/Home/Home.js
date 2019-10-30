import React, { Component } from 'react';
import Header from "../Header/Header"

import Slider from './slider';
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( <div>
            <Header/>
<Slider/>
        </div> );
    }
}
 
export default Home;