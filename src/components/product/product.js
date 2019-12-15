import React from 'react';
import './product.css';
import Data from '../../data/mockup.json';

class Product extends React.Component {
   constructor() {
    super();
    
   }
   componentDidMount () {
    
    const products = this.props.location.state
    console.log(products);
  }
    render() {
    return <div>
        <h3>Create product</h3>
        <div className="form-group">
            <label>Title</label>
            <input type="text"/>
        </div>
        <div className="form-group">
            <label>Category</label>
            <select name="" id="">
                {Data.map((product, index) => {
                    return <option key={index}>{product.category}</option>                 
                })}
            </select>
        </div>
        <div className="form-group">
            <label>Quantity</label>
            <input type="number"/>
        </div>
        <div className="form-group">
            <label>Description</label>
            <textarea name="" id="" cols="30" rows="5"></textarea>
        </div>
        <div>
            <button className="btn-submit">Save</button>
        </div>
    </div>;
  }
}

export default Product;
