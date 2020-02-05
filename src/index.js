import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import Data from './data/mockup.json';
import CreateProduct from './components/createProduct/createProduct';
import Product from './components/product/product';
import Navigation from './components/navigation';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import rootReducer from './rootReducer';
import { Provider } from 'react-redux';


const store = createStore(rootReducer);

const products = Data.map((product,index) => {
    product.index = index;
    return product;
});
function AddProduct(product) {
    products.push(product);
}
function editProduct(product) {
    console.log(products);
}
const routing = (
  <Provider store={store}>
      <Router>
        <Navigation/>
        <div className="content">
          <Route exact path="/" render={(props) => <App {...props} editProduct={editProduct} />} />
          <Route path="/create-product" render={(props) => <CreateProduct {...props} addProduct={AddProduct}  />}  />
          <Route path="/product"  component={Product} />
        </div>
      </Router>
  </Provider>

)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


