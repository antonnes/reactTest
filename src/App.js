import React from 'react';
import logo from './logo.svg';
import './App.css';
import Datagrid from './components/datagrid/datagrid';


function App(props) {
  return (
    <div className="App">
        <Datagrid editProduct={props.editProduct}/>
    </div>
  );
}

export default App;
