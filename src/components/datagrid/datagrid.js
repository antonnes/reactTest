import React from 'react';
import './datagrid.css';
import Data from '../../data/mockup.json';
import Popover from '../popover/popover';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
library.add(faEllipsisV);
//import { faEllipsisV } from '@fortawesome/fontawesome-svg-core';



class Datagrid extends React.Component {
   constructor() {
    super();
  }
  test() {
    console.log(123);
  }
  render() {
    return <table className="datagrid">
        <thead>
            <tr>
                <th>#</th>
                <th>Title</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Description</th>
                <th>Date Created</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {Data.map((product, index) => {
                return <tr key={product.Id}>
                <td>{product.Id}</td>
                <td>{product.title}</td>
                <td>{product.category}</td>
                <td>{product.quantity}</td>
                <td>{product.description}</td>
                <td>{product.creationDate}</td>
                <td>
                    <span className='icon' onClick={this.test}>
                        <FontAwesomeIcon icon="ellipsis-v" />
                    </span>
                    <Popover/>
                </td>
            </tr>
            })}
            
        </tbody>
    </table>
  }
}

export default Datagrid;
