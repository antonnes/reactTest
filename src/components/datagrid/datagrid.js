import React from 'react';
import ReactDOM from 'react-dom';
import './datagrid.css';
import Data from '../../data/mockup.json';
import Popover from '../popover/popover';

// Plugins
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEllipsisV, faSort, faSortUp, faSortDown, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

library.add(faEllipsisV, faSort, faSortUp, faSortDown, faTrashAlt);

Modal.setAppElement('#root');

class Datagrid extends React.Component {

  constructor() {
    super();
   
    this.state = {
      showModal: false,
      indexToDelete: null,
      fields: {
          Id: null,
          title: null,
          category: null,
          quantity: null,
          description: null,
          createdDate: null
      },
      products: Data.map((product) => {
          //product.createdDate = new Intl.DateTimeFormat('en-US').format(new Date(product.createdDate)).join(" - ");
          return product;
      })
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }
  componentDidMount () {
    const products = this.props.products;
    console.log(this.props);
  }
  handleOpenModal (index) {
    this.setState({ showModal: true, indexToDelete: index });
  }  
  handleCloseModal () {
    this.setState({ showModal: false, indexToDelete: null });
  }
  handleOutsideClick(e) {
    // ignore clicks on the component itself
    if (this.node.contains(e.target)) {
      return;
    }
    
    this.handleClick();
  }
  deleteProduct() {
      console.log(this.state.indexToDelete);
      let products = [...this.state.products];
      products.splice(this.state.indexToDelete,1);
      this.setState({products: products});
      this.handleCloseModal();
  }
  filter(string) {
      let result = this.state.products.filter(product => product.title.includes('tempor'));
      this.setState({
        products: result
    });
  }
  render() {
    return <React.Fragment>
    <div className="control-panel">        
        <input type="text"/>
        <button className="btn-submit" onClick={() => {this.filter()}}>Search</button>        
    </div>
    <table className="datagrid">
        <thead>
            <tr>
                <th>#</th>
                <th>
                    Title
                    <span className="sort-icon">
                        <FontAwesomeIcon icon="sort"/>
                    </span>
                </th>
                <th onClick={() => {this.sort('category')}}>
                    Category
                    <span className="sort-icon">
                        {this.state.fields.category == null && <FontAwesomeIcon icon="sort"/>}               
                        {this.state.fields.category == 'ASC' && <FontAwesomeIcon icon="sort-up"/>}            
                        {this.state.fields.category == 'DESC' && <FontAwesomeIcon icon="sort-down"/>}               
                    </span>
                </th>
                <th>
                    Quantity
                    <span className="sort-icon">
                        <FontAwesomeIcon icon="sort"/>
                    </span>
                </th>
                <th
                    >Description
                    <span className="sort-icon">
                        <FontAwesomeIcon icon="sort"/>
                    </span>
                </th>
                <th>
                    Date Created
                    <span className="sort-icon">
                        <FontAwesomeIcon icon="sort"/>
                    </span>
                </th>
                <th>
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            {this.state.products.map((product, index) => {
                return <tr key={product.Id}>
                <td>{product.Id} </td>
                <td>{product.title}</td>
                <td className="category-column">{product.category}</td>
                <td className="quantity-column">{product.quantity}</td>
                <td>{product.description}</td>
                <td>{product.creationDate}</td>
                <td>
                    <span className="btn-delete" onClick={() => this.handleOpenModal(index)}><FontAwesomeIcon icon="trash-alt"/></span>                    
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
                <button className="btn-submit danger" onClick={() => {this.deleteProduct()}}>Ok</button>
                <button className="btn-cancel" onClick={this.handleCloseModal}>Cancel</button>
            </div>
        </div>
    </Modal>
    </React.Fragment>
  }
}

export default Datagrid;
