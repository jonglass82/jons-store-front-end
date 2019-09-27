import React from 'react';
import './App.css';
import axios from 'axios';
import Products from './components/products.js';
import Header from './components/header.js';

function App() {

  return (
    <div className="App">

      <Header></Header>
     
      <Products></Products>

    </div>
  );
}

export default App;
