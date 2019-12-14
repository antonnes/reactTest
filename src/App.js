import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navigation from './components/navigation';
import Datagrid from './components/datagrid/datagrid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

function App() {
  return (
    <div className="App">
        <Navigation/>
        <div className="content">
          <Datagrid/>
        </div>
    </div>
  );
}

export default App;
