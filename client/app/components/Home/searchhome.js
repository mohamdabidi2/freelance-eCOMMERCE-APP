import React, { Component } from 'react';
import LogedHeader from "../Header/LogedHeader"

import Slider from './slider';
import ProductsTemps from './productss';
class SearchHome extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( <div>
            <LogedHeader/>
<Slider/>
<ProductsTemps/>
        </div> );
    }
}
 
export default SearchHome;