import React from 'react';
import './navigation.css';

class Navigation extends React.Component {
   constructor() {
    super();
    this.navItems = [{title: 'Home', className: ''}, {title: 'Create product', className: 'float-right'}];
  }
    render() {
    return <div className="navigation clearfix">
      {this.navItems.map((value, index) => {
        return <a href="" title="" className={value.className} key={index}>{value.title}</a>
      })}
    </div>;
  }
}

export default Navigation;
