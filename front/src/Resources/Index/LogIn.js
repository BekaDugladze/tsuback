import React, { Component } from "react";
import './login.css';
import { NavLink } from "react-router-dom";
import { login } from "../action/action";
import { useDispatch } from "react-redux";
import App from "../../App";

class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valueLogIn: '',
            password: '',
            errorMessageLogin: '',
            showPassword: false,
            personalN: '',
            authed: false
        }
    }
    handleLogin = (e) => {
        let value = e.target.value;
        value = value.replace(/[^0-9]/g, '');
        if (value.length > 11) {
            value = value.slice(0, 11)
        };

        this.setState({ personalN: value});
    };
    handlePasswordLogIn = (e) => {
        let password = e.target.value;
        password = password.replace(/[,;*$%]/g, '');
        if (/^[a-zA-Z0-9!@#$^&(){}<>]*$/g.test(password)) {
            this.setState({
              password,
              error: '',
            });
          }
        else if (/[,;*$%]/.test(password)) {
            this.setState({ 
                password, 
                error: 'Password should not contain , % ; and * characters!'
            });
        } 
      }
      
    passwordVisibility = () => {
        this.setState((prevState) => ({
          showPassword: !prevState.showPassword,
        }));
      };


     handleLoginForm= async (e) => {
        e.preventDefault();
        const {password, personalN} = this.state;
        const API_URL = 'http://localhost:3002/login'; 

        try{
            const loginResponse = await fetch(API_URL, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    personalN,
                    password
                })
            });
            if(!loginResponse.ok) {
                this.setState({errorMessageLogin: 'User not Found'})
            }
            else{
            window.location.href = '/account'
            }
        
            
        }
        catch(err) {
            alert('Login failed: ' + err.message);
            console.log(err);
        }
      }
    render() {
        const {  showPassword } = this.state;
    const inputType = showPassword ? 'text' : 'password';
    return(
        <div className="form-login-div">
            <h2>Authorization</h2>
            <form className="form-login" onSubmit={this.handleLoginForm}>
                <label htmlFor = "Personal N">Personal N</label>
                <input type="text" name="PersonalN" 
                    value={this.state.value}
                    onChange={this.handleLogin}
                    required
                />
                <label htmlFor = "Password" >Password</label>
                <div className="password">
                <input type={inputType} name="Password" 
                    value={this.state.passwordLogIn}
                    onChange={this.handlePasswordLogIn} 
                    required/>
                    <button type="button" onClick={this.passwordVisibility}>
                      {showPassword ? <span className="material-symbols-outlined">visibility_off</span> : <span className="material-symbols-outlined">visibility</span>}
                    </button>
                </div>
                <p id="errorLoginMessage">{this.state.errorMessageLogin}</p>
                <input type="submit" name="LogIn" value="LogIn" id="logIn" />
            </form>
        </div>
    )
}
}

export default LogIn