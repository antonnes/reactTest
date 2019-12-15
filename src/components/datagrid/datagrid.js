import React from 'react';
import ReactDOM from 'react-dom';
import './datagrid.css';
import Data from '../../data/mockup.json';
import Popover from '../popover/popover';

// Plugins
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEllipsisV, faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

library.add(faEllipsisV, faSort, faSortUp, faSortDown);

Modal.setAppElement('#root');

class Datagrid extends React.Component {

  constructor() {
    super();
    this.state = {
      activeIndex: null,
      activeSortField: null,
      sortOrder: null,
      showModal: false,
      fields: {
          Id: null,
          title: null,
          category: null,
          quantity: null,
          description: null,
          createdDate: null
      },
      products: Data.map((product,index) => {
          product.index = index;
          return product;
      })
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }
  handleOpenModal () {
    this.setState({ showModal: true });
  }  
  handleCloseModal () {
    this.setState({ showModal: false });
  }
  test(index) {
    this.setState({activeIndex: index});
  }
  sort(field) {
    let order = this.state.fields[field] == null || this.state.fields[field] == 'DESC' ? 'ASC' : 'DESC'; 
    this.setState({
        fields: {
            [field]: order
        }
    });
  }
  handleOutsideClick(e) {
    // ignore clicks on the component itself
    if (this.node.contains(e.target)) {
      return;
    }
    
    this.handleClick();
  }
  deleteProduct(index) {
      console.log(index);
      let products = [...this.state.products];
      products.splice(index,1);
      this.setState({products: products});
      this.handleCloseModal();
  }
  render() {
    return <table className="datagrid">
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
            {this.state.products.map((product) => {
                return <tr key={product.Id}>
                <td>{product.Id} </td>
                <td>{product.title}</td>
                <td>{product.category}</td>
                <td>{product.quantity}</td>
                <td>{product.description}</td>
                <td>{product.creationDate}</td>
                <td>
                    <a href="" title="">Edit</a> | <a href="javascript:void(0)" title="" onClick={this.handleOpenModal}>Delete</a> 
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
                            
                            <button className="btn-submit danger" onClick={() => {this.deleteProduct(product.index)}}>Ok</button>
                            <button className="btn-cancel" onClick={this.handleCloseModal}>Cancel</button>
                       </div>
                    </div>
                    </Modal>
                    {/* <span className='icon' onClick={() => {this.test(index)}}>
                        <FontAwesomeIcon icon="ellipsis-v"/>
                    </span>
                    {this.state.activeIndex == index &&  <Popover />} */}
                   
                </td>
            </tr>
            })}
            
        </tbody>
    </table>
  }
}

export default Datagrid;
