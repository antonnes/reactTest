import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import Data from './data/mockup.json';
import Product from './components/product/product';
import Navigation from './components/navigation';
import * as serviceWorker from './serviceWorker';


const products = Data.map((product,index) => {
    product.index = index;
    return product;
});
function CreateProduct(product) {
    products.push(product);
    console.log(products);
}
const routing = (
  <Router>
    <Navigation/>
    <div className="content">
      <Route exact path="/" render={(products) => <App products={products} />} />
      <Route path="/product" render={(products) => <Product products={products} addProduct={CreateProduct}  />}  />
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
