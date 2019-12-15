import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import Product from './components/product/product';
import Navigation from './components/navigation';
import * as serviceWorker from './serviceWorker';

const routing = (
  <Router>
    <Navigation/>
    <div className="content">
      <Route exact path="/" component={App} />
      <Route path="/product" render={(props) => <Product {...props}  />}  />
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
