import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Resources/register';
import FirstPage from './Resources/starting';
import Account from './Resources/account';
import AccountGuard from './Resources/accountGuard';
import './App.css';
import { useState, setState, useEffect } from 'react';
import Profile from './Resources/profile';




class App extends Component {
  constructor(props){
  super(props);
  this.state = {
      authed : false
  }
}
async isAuthed() {
  const API_URL = 'http://localhost:3002/account'; // Include the protocol
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    
    if (response.ok) {
      this.setState({ authed: true });
    }
  } catch (err) {
    console.log(err);
    alert(err.message);
  }
}
async componentDidMount() {
  // Check authentication status when the component mounts
  await this.isAuthed();
}

  render() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FirstPage/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/account/" element={<AccountGuard  element={Account}/> } />
        <Route path="/account/profile" element={<AccountGuard  element={Profile}/> } />
      </Routes>
    </Router>
  );
}
}

export default App;
