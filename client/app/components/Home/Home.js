import React, { Component } from 'react';
import Header from "../Header/Header"

import Slider from './slider';
import ProductsTemp from './products';
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( <div>
            <Header/>
<Slider/>
<ProductsTemp/>

        </div> );
    }
}
 
export default Home;