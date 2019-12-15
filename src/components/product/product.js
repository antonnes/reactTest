import React from 'react';
import './product.css';
import Data from '../../data/mockup.json';

class Product extends React.Component {
    constructor() {
        super();
        this.state = {
            formControls: {
                title: null,
                category: null,
                quantity: null,
                description: null,
            },
            products: []
        };
        this.changeHandler = this.changeHandler.bind(this);
        this.createProduct = this.createProduct.bind(this);
        

    }
    componentDidMount () {
        const products = this.props.products;
        this.setState({products: products})
    }

    changeHandler(key) {
        return function (e) {
            var state = {};
            state[key] = e.target.value;
            this.setState(state);
        }.bind(this);

    }

    createProduct(event) {
        event.preventDefault();
        let product = {
            name: this.state.title,
            category: this.state.category,
            quantity: this.state.quantity,
            description: this.state.description
        }
        this.props.addProduct(product);
        console.log(product);
    }   
    render() {
    return <div>
        <h3>Create product</h3>
        <form onSubmit={this.createProduct}>
            <div className="form-group">
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={this.changeHandler('title')} />
            </div>
            <div className="form-group">
                <label>Category</label>
                <select name="" id="" value={this.state.category} onChange={this.changeHandler('category')}>
                    <option value="">Choose category</option>
                    {Data.map((product, index) => {
                        return <option key={index}>{product.category}</option>                 
                    })}
                </select>
            </div>
            <div className="form-group">
                <label>Quantity</label>
                <input type="number" value={this.state.quantity} onChange={this.changeHandler('quantity')} />
            </div>
            <div className="form-group">
                <label>Description</label>
                <textarea name="" id="" cols="30" rows="5" value={this.state.description} onChange={this.changeHandler('description')} ></textarea>
            </div>
            <div>
                <button type="submit" className="btn-submit">Save</button>
            </div>
        </form>
    </div>;
    }
}

export default Product;
