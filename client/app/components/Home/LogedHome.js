import React, { Component } from 'react';
import LogedHeader from "../Header/LogedHeader"

import Slider from './slider';
class LogedHome extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( <div>
            <LogedHeader/>
<Slider/>
        </div> );
    }
}
 
export default LogedHome;