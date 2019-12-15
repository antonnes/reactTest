import React from 'react';
import './navigation.css';
import { Link} from 'react-router-dom';
class Navigation extends React.Component {
   constructor() {
    super();
    this.navItems = [{title: 'Home', className: '', linkTo: '/'}, {title: 'Create product', className: 'float-right', linkTo: '/product'}];
  }
    render() {
    return <div className="navigation clearfix">
      {this.navItems.map((value, index) => {
        return   <span className={value.className} key={index}><Link to={value.linkTo}>{value.title}</Link></span>
      })}
    </div>;
  }
}

export default Navigation;
