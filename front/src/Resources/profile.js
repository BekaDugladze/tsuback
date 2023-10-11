import React, {Component} from 'react';
import HeaderAcc from './account/headerAcc'
import LeftNavBar from './account/leftNavBar'
import MessengerTab from './account/messengerTab';
import './css/profile.css'
import proIcon from './Photo/proIcon.png';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';

class Profile extends Component{
    constructor(props) {
        super(props);
        this.state = {
          selectedFile: '',
          userPhotoUrl: proIcon,
          name: '',
          lastName: '',
          email:'', 
          personalN: '',
          activeTab: 'tab1',
        };
        this.submitPhoto = this.submitPhoto.bind(this);
      }
    
      handleFileChange = (e) => {
        const file = e.target.files[0];
        this.setState({ selectedFile: file });
      };

      submitPhoto= async (e) => {
        e.preventDefault();
        const API = 'http://localhost:3002/upload';
        const formData = new FormData();
        formData.append('photo', this.state.selectedFile);
      
        try {
          const response = await fetch(API, {
            method: 'POST',
            credentials: 'include',
            body: formData,
          });
      
          if (response.status === 200) {
            console.log('success')
          } else if (response.status === 400) {
            const data = await response.json();
            alert(data.message); // Display the error message from the server
          } else {
            alert('Error'); // Handle other error cases
          }
        } catch (err) {
          console.log(err);
          alert(err.message);
        }
      }

  componentDidMount() {
    // Fetch the user's photo from the server when the component mounts
    this.getUserPhoto();
    this.getUserInfo()
  }

  getUserPhoto = async () => {
    try {
      // Fetch the user's photo from the server using the /getPhoto endpoint
      const response = await fetch('http://localhost:3002/uploaded', {
        method: 'GET',
        credentials: 'include',
        headers: {
          Accept: 'image/jpeg', // Adjust the content type as needed
        },
      });

      if (response.ok) {
        // Create a blob URL from the response data to display the image
        const blob = await response.blob();
        const userPhotoUrl = URL.createObjectURL(blob);

        // Update the state with the user's photo URL
        this.setState({ userPhotoUrl });
      } else {
        console.error('Error fetching user photo');
      }
    } catch (error) {
      console.error(error);
    }
  };

    async getUserInfo() {
      try {
        // Fetch the user's photo from the server using the /getPhoto endpoint
        const response = await fetch('http://localhost:3002/profile', {
          method: 'GET',
          credentials: 'include',
        });
  
        if (response.ok) {
          const data = await response.json();
          this.setState({
            name: data.name,
            lastName: data.lastName,
            email: data.email,
            personalN: data.personaln
          } );
        } else {
          alert('Error fetching user in else photo');
        }
      } catch (error) {
        console.log(error);
        alert('Error fetching user photo')
      }
    };
    handleTabClick = (tab) => {
      this.setState({ activeTab: tab });
      // Perform any action you want when a tab is clicked, e.g., show/hide content.
    };
    render() {
        return (
            <>
            <HeaderAcc />
            <LeftNavBar />
            <MessengerTab />
            <div>
                <div className='profileInfo'>
                    <div className='photoManage'>
                        <img id="profileImg" src={this.state.selectedFile ? URL.createObjectURL(this.state.selectedFile): this.state.userPhotoUrl } /> 
                    <form onSubmit={this.submitPhoto} action="/upload" method="POST" encType="multipart/form-data" id='uploadPhoto'>
                        <input type="file" accept="image/jpeg" name="photo" onChange={this.handleFileChange}  id='selectPhoto'/>
                        <label htmlFor='photo' id='photoLabel'>Select Photo</label>
                        <button type="submit" id='uploadImg'>Upload</button>
                    </form>
                    </div>
                    <div className='userInfo'>
                      <h1 id='userInfo'>{this.state.name}  {this.state.lastName}</h1>
                      <h2 id='persoN'>Personal N: {this.state.personalN}</h2>
                      <h3 id='maili'>email: <a id='Aemail'href={`mailto:${this.state.email}`}> {this.state.email}</a></h3>
                    </div>
                </div>
            </div>
            <div className='miniBar'>
              <ul>
                <li><button 
                onClick={() => this.handleTabClick('tab1')}
                style={{
                  background: this.state.activeTab === 'tab1' ? '#0077B5' : 'white',
                  color: this.state.activeTab === 'tab1' ? 'white' : '#0077B5',
                }}>Study Card</button></li>
                <li><button 
                onClick={() => this.handleTabClick('tab2')}
                style={{
                  background: this.state.activeTab === 'tab2' ? '#0077B5' : 'white',
                  color: this.state.activeTab === 'tab2' ? 'white' : '#0077B5',
                }}>Financial Condition</button></li>
                <li><button 
                onClick={() => this.handleTabClick('tab3')}
                style={{
                  background: this.state.activeTab === 'tab3' ? '#0077B5' : 'white',
                  color: this.state.activeTab === 'tab3' ? 'white' : '#0077B5',
                }}>Course Registration</button></li>
                <li><button 
                onClick={() => this.handleTabClick('tab4')}
                style={{
                  background: this.state.activeTab === 'tab4' ? '#0077B5' : 'white',
                  color: this.state.activeTab === 'tab4' ? 'white' : '#0077B5',
                }}>Schedule</button></li>
                <li><button 
                onClick={() => this.handleTabClick('tab5')}
                style={{
                  background: this.state.activeTab === 'tab5' ? '#0077B5' : 'white',
                  color: this.state.activeTab === 'tab5' ? 'white' : '#0077B5',
                }}>Program</button></li>
                <li><button 
                onClick={() => this.handleTabClick('tab6')}
                style={{
                  background: this.state.activeTab === 'tab6' ? '#0077B5' : 'white',
                  color: this.state.activeTab === 'tab6' ? 'white' : '#0077B5',
                }}>Orders</button></li>
                <li><button 
                onClick={() => this.handleTabClick('tab7')}
                style={{
                  background: this.state.activeTab === 'tab7' ? '#0077B5' : 'white',
                  color: this.state.activeTab === 'tab7' ? 'white' : '#0077B5',
                }}>Inner Mobility</button></li>
                <li><button 
                onClick={() => this.handleTabClick('tab8')}
                style={{
                  background: this.state.activeTab === 'tab8' ? '#0077B5' : 'white',
                  color: this.state.activeTab === 'tab8' ? 'white' : '#0077B5',
                }}>Self-Governance</button></li>
              </ul>
              <h1>Nothing is to render</h1>
            </div>
            </>
        )
    }
}

export default Profile