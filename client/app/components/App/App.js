import React, { Component } from 'react';
import {
  setInStorage,
  getFromStorage,
} from '../utils/storage';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const App = ({ children }) => (
  <>

   

    <main>
      {children}
    </main>


  </>
);

export default App;
