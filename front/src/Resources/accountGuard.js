import React, {Component, Route, Navigate} from "react";
import Account from './account'
import FirstPage from "./starting";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

  class AccountGuard extends Component {
    constructor(props) {
      super(props);
      this.state = {
        authed: false,
        loading: true,
      };
    }
  
    async componentDidMount() {
      await this.isAuthed();
    }
  
    async isAuthed() {
      const API_URL = 'http://localhost:3002/account';
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
  
        this.setState({ loading: false });
      } catch (err) {
        console.log(err);
        alert(err.message);
        this.setState({ loading: false });
      }
    }
  
    render() {
      const { authed, loading } = this.state;
      const { element: Component } = this.props;
  
      if (loading) {
        return <div>Loading...</div>;
      }
  
      if (authed) {
        return <Component />
      } else {
        return <FirstPage />
      }
    }
  }
  
  
export default AccountGuard;
