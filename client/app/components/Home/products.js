import React, { Component } from 'react';
import Axios from 'axios';
class ProductsTemp extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            products:[]
         }
    }
    componentDidMount(){
        Axios.get("/api/products/all").then(res=>this.setState({
            products:res.data
        }))
    }
    render() { 
        return ( 
            <div>
                {this.state.products.map(el=>{return(
                    <div>

                    </div>
                )})}
            </div>
         );
    }
}
 
export default ProductsTemp;