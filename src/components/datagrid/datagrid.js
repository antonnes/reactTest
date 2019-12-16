import React from 'react';
import ReactDOM from 'react-dom';
import './datagrid.css';
import Data from '../../data/mockup.json';

// Plugins
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEllipsisV, faSort, faSortUp, faSortDown, faTrashAlt, faTimes, faSearch } from '@fortawesome/free-solid-svg-icons';

library.add(faEllipsisV, faSort, faSortUp, faSortDown, faTrashAlt, faTimes, faSearch);

Modal.setAppElement('#root');

class Datagrid extends React.Component {

    constructor() {
        super();
        const products = Data.map((product) => {
            product.creationDate = this.FormatDate(product.creationDate);
            return product;
        });
        this.state = {
            showModal: false,
            indexToDelete: null,
            searchString: '',
            clearVisible: false,
            searchInTitle: true,
            searchInDescription: false,
            searchInCategory: false,
            products: products,
            filteredProducts: products
        };
        this.OpenModal = this.OpenModal.bind(this);
        this.CloseModal = this.CloseModal.bind(this);
        this.ClearFilter = this.ClearFilter.bind(this);
        this.CheckBoxChanged = this.CheckBoxChanged.bind(this);
    }
    componentDidMount () {
        const products = this.props.products;
        console.log(this.props);
    }
    OpenModal (index) {
        this.setState({ showModal: true, indexToDelete: index });
    }  
    CloseModal () {
        this.setState({ showModal: false, indexToDelete: null });
    }
    DeleteProduct() {
        let products = [...this.state.products];
        let filteredProducts = [...this.state.filteredProducts];
        products.splice(this.state.indexToDelete,1);
        filteredProducts.splice(this.state.indexToDelete,1);
        this.setState({products: products, filteredProducts: filteredProducts});
        this.CloseModal();
    }
    Filter() {
        let searchString = this.state.searchString;
        if(searchString != null) {
            let result = this.state.products.filter(product => {
                let searchOptions = {title: this.state.searchInTitle, description: this.state.searchInDescription, category: this.state.searchInCategory};
                for (let index in searchOptions) {
                    if(product[index].includes(searchString)) {
                        return product;
                    }                    
                }
            });
            this.setState({
                filteredProducts: result
            });
        } else {
            this.setState({
                filteredProducts: this.state.products
            });
        }

    }
    ClearFilter() {
        this.setState({
            filteredProducts: this.state.products,
            searchString: ''
        });
    }
    changeHandler(key) {
                
        return function (e) {
            var state = {};
            state[key] = e.target.value;
            this.setState(state);
        }.bind(this);

    }
    CheckBoxChanged(key) {
         return function (e) {
            var state = {};
            state[key] = !this.state[key];
            this.setState(state);
        }.bind(this);
        
    }
    FormatDate(date) {
        let year = new Date(date).getFullYear();
        let month =  new Date(date).getMonth();
        let day =  new Date(date).getDate();
        return `${day}.${month}.${year}`;
    }
  render() {
    return <React.Fragment>
    <div className="control-panel">        
        <div className="clearfix">
            <div className="search-box">
                <span className="icon search">
                    <FontAwesomeIcon icon="search"/>
                </span>
                <input type="text" value={this.state.searchString} onChange={this.changeHandler('searchString')}/>
                {this.state.searchString && <span className="icon clear" onClick={this.ClearFilter}>
                    <FontAwesomeIcon icon="times"/>
                </span> }
            </div>
            <button className="btn-submit" onClick={() => {this.Filter()}}>Search</button>
        </div>
        <div className="search-options">
            <label>
                <input
                    type="checkbox"
                    checked={this.state.searchInTitle}
                    onChange={this.CheckBoxChanged('searchInTitle')}
                />
                <span>Search in title</span>
            </label>
            <label>
                <input
                    type="checkbox"
                    checked={this.state.searchInDescription}
                    onChange={this.CheckBoxChanged('searchInDescription')}
                />
                <span>Search in description</span>
            </label>
            <label>
                <input
                    type="checkbox"
                    checked={this.state.searchInCategory}
                    onChange={this.CheckBoxChanged('searchInCategory')}
                />
                <span>Search in category</span>
            </label>
        </div>
    </div>
    <table className="datagrid">
        <thead>
            <tr>
                <th>#</th>
                <th>
                    Title
                </th>
                <th>
                    Category
                </th>
                <th>
                    Quantity
                </th>
                <th>Description
                </th>
                <th>
                    Date Created
                </th>
                <th>
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            {this.state.filteredProducts.map((product, index) => {
                return <tr key={product.Id}>
                <td>{product.Id} </td>
                <td>{product.title}</td>
                <td className="category-column">{product.category}</td>
                <td className="quantity-column">{product.quantity}</td>
                <td>{product.description}</td>
                <td>{product.creationDate}</td>
                <td>
                    <span className="btn-delete" onClick={() => this.OpenModal(index)}><FontAwesomeIcon icon="trash-alt"/></span>                    
                </td>
            </tr>
            })}            
        </tbody>
    </table>
    <Modal 
        isOpen={this.state.showModal}
        contentLabel="onRequestClose Example"
        onRequestClose={this.handleCloseModal}
        shouldCloseOnOverlayClick={true}
        className="Modal"
        overlayClassName="Overlay"
        >
        <div className="modal-content">
            <p>Are you sure you want to delete this?</p>
        </div>
        <div className="modal-footer">
            <div className="float-right">                            
                <button className="btn-submit danger" onClick={() => {this.DeleteProduct()}}>Ok</button>
                <button className="btn-cancel" onClick={this.CloseModal}>Cancel</button>
            </div>
        </div>
    </Modal>
    </React.Fragment>
  }
}

export default Datagrid;
