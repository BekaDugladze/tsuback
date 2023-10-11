import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'; 
import Logo from '../Photo/logo.png';
import './css/headerAcc.css'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setDivVisibility } from '../action/action';
import { connect } from 'react-redux';

class HeaderAcc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logout: false,
    }
  }

  handleLogout = async () => {
    const API_URL = 'http://localhost:3002/logout'; 
    try{
      const logOut = await fetch(API_URL, {
        method : 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include"
      })
      if (logOut.ok) {
        // Logout was successful on the server
        // Redirect the user to the login page or another appropriate page
        window.location.href = '/';
      } else {
        // Handle server error or unexpected response
        const responseData = await logOut.json();
        // Display an error message to the user or handle it appropriately
        alert(responseData.message || 'Logout failed');
      }
    }
    catch(err){
      alert(err.message);
      console.log(err);
    }
  }

  handleMediaChange = (e) => {
    this.props.setDivVisibility(!e.matches);
  };
  render() {
    return (
      <div className="headerAcc">
        <div className="child">
          <div className="headerAccLogoH">
            <NavLink to='/account'><img src={Logo} alt="TSU Logo" /></NavLink>
            <div className="headerAccHashes">
              <h1>თბილისის სახელმწიფო უნივერსიტეტი</h1>
              <h1>Tbilisi State University</h1>
            </div>
          </div>
          <input type="search" placeholder="Search Person" />
          <div className="NavLinks-NavBar">
            <NavLink to=''><span className="material-symbols-outlined">chat</span></NavLink>
            <NavLink to=''><span className="material-symbols-outlined">notifications</span></NavLink>
            <NavLink to='/account/profile'><span className="material-symbols-outlined">account_circle</span></NavLink>
            <NavLink id="logout" onClick={this.handleLogout}><span className="material-symbols-outlined">logout</span></NavLink>
            <NavLink to=''><span className="material-symbols-outlined" id='searchA'>search</span></NavLink>
            <button onClick={this.handleMediaChange} id='menu'><span className="material-symbols-outlined">menu</span></button>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  setDivVisibility,
};
export default connect(null, mapDispatchToProps) (HeaderAcc);
