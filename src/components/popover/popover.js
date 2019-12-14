import React from 'react';
import './popover.css';

class Popover extends React.Component {
   constructor() {
    super();
    
  }
    render() {
    return <div className="popover">
      <div>Edit</div>
      <div>Delete</div>
    </div>;
  }
}

export default Popover;
