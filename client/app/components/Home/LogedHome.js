import React, { Component } from 'react';
import LogedHeader from "../Header/LogedHeader"

import Slider from './slider';
import ProductsTemp from './products';
class LogedHome extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( <div>
            <LogedHeader/>
<Slider/>
<ProductsTemp/>
        </div> );
    }
}
 
export default LogedHome;