import React from 'react';
import './product.css';
import Data from '../../data/mockup.json';
import { connect } from 'react-redux';

class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {
                title: '',
                category: '',
                quantity: '',
                creationDate: '',
                description: '',
            }
        };
        console.log(this.props);
        this.changeHandler = this.changeHandler.bind(this);
        this.EditProduct = this.EditProduct.bind(this);      
        console.log(this.props);
    }
    componentDidMount () {
       this.setState({product: this.props.product});
    }

    changeHandler(key) {
        return function (e) {
            var state = {
                product: this.props.product
            };
            state.product[key] = e.target.value;
            this.setState(state);
        }.bind(this);

    }

    EditProduct(event) {
        event.preventDefault();

        let product = this.state.product;
       
        if(this.checkAllRequired(product)) {
            this.setState({hasErrors: true});
        } else {
            //this.props.editProduct(product);
            this.setState({hasErrors: false});
            this.props.editProduct(product);
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
        <h3>Edit product</h3>
        <form onSubmit={this.EditProduct}>
            <div className="form-group">
                <label>Title</label>
                <input type="text" value={this.state.product.title} onChange={this.changeHandler('title')} />
            </div>
            <div className="form-group">
                <label>Category</label>
                <select name="" id="" value={this.state.product.category} onChange={this.changeHandler('category')}>
                    <option value="">Choose category</option>
                    {Data.map((product, index) => {
                        return <option key={index}>{product.category}</option>                 
                    })}
                </select>
            </div>
            <div className="form-group">
                <label>Quantity</label>
                <input type="number" value={this.state.product.quantity} onChange={this.changeHandler('quantity')} />
            </div>
            <div className="form-group">
                <label>Creation Date</label>
                <input type="text" value={this.state.product.creationDate} disabled />
            </div>
            <div className="form-group">
                <label>Description</label>
                <textarea name="" id="" cols="30" rows="5" value={this.state.product.description} onChange={this.changeHandler('description')} ></textarea>
            </div>
            {/* <div className="form-group">
                {this.state.hasErrors && <span className="error">Please fill all required fields</span>}
            </div> */}
            <div>
                <button type="submit" className="btn-submit">Save</button>
            </div>
        </form>

    </div>;
    }
}

const mapStateToProps = (state, ownProps) => {
    let id = ownProps.match.params.id;
    console.log(id);
    return {
        product: state.products.find(prod => {
            return prod.Id == id;
        })
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editProduct: (product) => {
            dispatch({
                type: 'EDIT_PRODUCT', product: product
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
