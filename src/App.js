import React from 'react';
import logo from './logo.svg';
import './App.css';
import Datagrid from './components/datagrid/datagrid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';


function App() {
  return (
    <div className="App">
        <Datagrid/>
    </div>
  );
}

export default App;
