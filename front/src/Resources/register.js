import React, { Component } from "react";
import HeaderOne from "./header";
import './css/register.css';
import Tsu from "./Photo/regImg.jpg"
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            password: '',
            confirmPassword: '',
            error: '',
            errorTwo: '',
            name: '',
            lastName: '',
            email: '',
            personalN: '',
            registrationResponse: '',
            redirectToAccount: false
        }
    }
    handleInputChange = (e) => {
        // Get the input value
        let value = e.target.value;
    
        // Remove any non-numeric characters using a regular expression
        value = value.replace(/[^0-9]/g, '');
        if (value.length > 11) {
            value = value.slice(0, 11);
          }
    
        // Update the state with the cleaned value
        this.setState({ value });
      }

      handleName = (e) => {
        const name = e.target.value;
        this.setState({ name: name });
      }
      
      handleLastName = (e) => {
        const lastName = e.target.value;
        this.setState({ lastName: lastName });
      }
      
      handleMail = (e) => {
        const email = e.target.value;
        this.setState({ email: email });
      }
      

      handlePassword = (e) => {
        let password = e.target.value;
        password = password.replace(/[,;*$]/g, '');
        if (/^[a-zA-Z0-9!@#$%^&(){}<>]*$/.test(password)) {
            this.setState({
              password,
              error: '',
            });
          }
        else if (/[,%;*]/.test(password)) {
            this.setState({ 
                password, 
                error: 'Password should not contain , % ; and * characters!'
            });
        } 
      }

      confirmPassword = (e) => {
        let confirmPassword = e.target.value;

        if (confirmPassword === this.state.password) {
            this.setState({
                confirmPassword,
                errorTwo: '' 
            });
        } else{
            this.setState({
                confirmPassword,
                errorTwo: 'Password does not match'
            })
        }
      };
      handleRegistration = async (e) => {
        e.preventDefault();
        const { name, lastName, password, email, value } = this.state;
        const API_URL = 'http://localhost:3002'; 
    
        try {
          // Step 1: Register the user
          const registrationResponse = await fetch(`${API_URL}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name,
              lastName,
              password,
              email,
              personalN: value,
            }),
          });
    
          if (!registrationResponse.ok) {
            alert('email or personalN is used');
          }
          else{
            this.setState({ registrationResponse: 'Congrats! You are now registered! Now Log In' });
            setTimeout(() =>{window.location.href ='/'} , 4000);
          }

        } catch (error) {
          alert('Error registering:', error.message);
          console.log(error);
        }
      };
      
    render() {
    return(
        <div>
            <HeaderOne className="regHead"/>
            <div className="main-register">
                <div className="registration-form">
                    <h2>Sign Up</h2>
                    <form onSubmit={this.handleRegistration}>
                        <div className="form-row">
                            <div>
                                <label htmlFor="Name">First Name</label>
                                <input type="text" name="name"
                                value={this.state.name} 
                                onChange={this.handleName}
                                required/>
                            </div>
                            <div>
                                <label htmlFor="LastName">Last Name</label>
                                <input type="text" name="lastName"  
                                value={this.state.lastName}
                                onChange={this.handleLastName}
                                required/>
                            </div>
                        </div>
                        <div className="form-row">
                            <div>
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" 
                                value={this.state.password}
                                onChange={this.handlePassword}
                                autoComplete="true"
                                required/>
                                {this.state.error && <p style={{ color: 'red' }}>{this.state.error}</p>}
                            </div>
                            <div>
                                <label htmlFor="repeatPassword">Repeat Password</label>
                                <input type="password" name="repeatPassword" 
                                value={this.state.confirmPassword}
                                onChange={this.confirmPassword}
                                autoComplete="true"
                                required />
                                
                                {this.state.errorTwo && <p style={{ color: 'red' }}>{this.state.errorTwo}</p>}
                            </div>
                        </div>
                        <div className="form-row">
                            <div>
                                <label htmlFor="Email">Email</label>
                                <input type="email" name="email"
                                value={this.state.email} 
                                onChange={this.handleMail}required />
                            </div>
                            <div>
                                <label htmlFor="PersonalN">Personal Number</label>
                                <input 
                                    type="type" 
                                    name="PersonalN" 
                                    required 
                                    value={this.state.value}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div>
                                <label htmlFor="studentOrLecturer">I am ...</label>
                                <select name="studentOrLecturer" id="studentOrLecturer" required>
                                    <option value="student">Student</option>
                                </select>
                            </div>
                        </div>
                        <p>{this.state.registrationResponse}</p>
                        <div className="button">
                            <input type="submit" name="signUp" value="SignUp" id="signUp"  />
                        </div>
                    </form>
                    <p>Or if you already have an account</p>
                    <NavLink to="/">Log In</NavLink>
                </div>
                <img src={Tsu} alt="Tbilisi State University"></img>
            </div>
        </div>
    )
}
}

export default Register