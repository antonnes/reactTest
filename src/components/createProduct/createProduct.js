import React from 'react';
import './createProduct.css';
import Data from '../../data/mockup.json';
import { connect } from 'react-redux';

class CreateProduct extends React.Component {
    constructor() {
        super();
        this.state = {
            formControls: {
                title: '',
                category: '',
                quantity: '',
                description: '',
            },
            hasErrors: false
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
            Id: this.state.products.length+1,
            title: this.state.title,
            category: this.state.category,
            quantity: this.state.quantity,
            description: this.state.description,
            creationDate: new Date().toString()
        }
       
        if(this.checkAllRequired(product)) {
            this.setState({hasErrors: true});
        } else {
            this.props.insertProduct(product);
            this.setState({hasErrors: false});
            this.props.history.push('/');
        }
    }   
    checkAllRequired(product) {
        let hasErrors = false;
        for(let item in product) {
            if(product[item] == '' || product[item] == null) {
                hasErrors = true;
            }
        }
        return hasErrors;
    }
    render() {
    return <div>
        <h3>Create product</h3>
        <form onSubmit={this.createProduct}>
            <div className="form-group">
                <label>Title</label>
                <input type="text"  onChange={this.changeHandler('title')} />                
            </div>
            <div className="form-group">
                <label>Category</label>
                <select name="" id="" onChange={this.changeHandler('category')}>
                    <option value="">Choose category</option>
                    {Data.map((product, index) => {
                        return <option key={index}>{product.category}</option>                 
                    })}
                </select>
            </div>
            <div className="form-group">
                <label>Quantity</label>
                <input type="number"  onChange={this.changeHandler('quantity')} />
            </div>
            <div className="form-group">
                <label>Description</label>
                <textarea name="" id="" cols="30" rows="5"  onChange={this.changeHandler('description')} ></textarea>
            </div>
            <div className="form-group">
                {this.state.hasErrors && <span className="error">Please fill all required fields</span>}
            </div>
            <div>
                <button type="submit" className="btn-submit">Save</button>
            </div>
        </form>
    </div>;
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        insertProduct: (product) => {
            dispatch({
                type: 'CREATE_PRODUCT', prod: product
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProduct);
