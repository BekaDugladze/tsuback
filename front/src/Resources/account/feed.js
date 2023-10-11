import { Component } from "react";
import React from "react";
import './css/feed.css'
import { useState, setState } from "react";
import proIcon from "../Photo/proIcon.png";

export default class Feed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFileImg: [],
            name: '',
            lastName: '',
            userPhotoUrl: proIcon,
            post: [],
            postPhotos: [],
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
            const data = await response.json();
            this.setState({ name: data.name, lastName: data.lastName });
        }
        } catch (err) {
        console.log(err);
        alert(err.message);
        }
    }
  
    
    handleImg = (e) => {
        const selectedFileImg = Array.from(e.target.files);
    this.setState((prevState) => ({
      selectedFileImg: [...prevState.selectedFileImg, ...selectedFileImg],
    }));
    }
    removeImage = (index) => {
        const { selectedFileImg } = this.state;
        const updatedFiles = [...selectedFileImg];
        updatedFiles.splice(index, 1);
        this.setState({ selectedFileImg: updatedFiles });
      };
      
      componentDidMount() {
        this.getUserPhoto();
        this.getUserInfo();
        this.getPosts()
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


      addPost = async (e) => {
        const API = 'http://localhost:3002/post';
        const formData = new FormData();
      
        // Append files to FormData
        this.state.selectedFileImg.forEach((file, index) => {
          formData.append(`postPhoto`, file);
        });
      
        const textElement = document.getElementById('editor');
        let text = textElement.innerText;
        formData.append('postText', text);
      
        try {
          const response = await fetch(API, {
            method: 'POST',
            credentials: 'include',
            body: 
                formData,
            
          });
      
          if (!response.ok) {
            alert('Error');
          } else {
            console.log('success');
          }
        } catch (err) {
          console.error(err);
        }
      }
      


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


      getPosts= async() => {
        try {
            const response = await fetch('http://localhost:3002/posted', {
                method: 'GET',
                credentials: 'include',
            })
            if (!response.ok){
                alert('Error fetching');
            }
            const data = await response.json();
            this.setState({
              post: data.data,
            });

        }
        catch (error) {
            console.log(error);
            alert(error)
        }
      }
    render() {
        return (
            <div className="feed">
                <div className="feed-container">
                    <button className="feedProfileBut">
                        <div className="feedPro">
                            <img id="profileImgOnFeed" src={this.state.userPhotoUrl } />
                            <p> {`${this.state.name} ${this.state.lastName}`} to anyone</p>
                        </div>
                    </button>
                    <form onSubmit={this.addPost}>
                    <div 
                    className="editor"
                    id="editor" 
                    contentEditable="true" 
                    role="textbox" 
                    aria-multiline="true" 
                    data-placeholder="write anything what you want" 
                    aria-label="write Post">
                    </div>
                    <div className="postTools">
                        <div className="photo">
                            <input 
                            type="file" 
                            name="postPhoto" 
                            id="uploadPhotoForPost" 
                            accept="image/*" 
                            multiple
                            onChange={this.handleImg}
                            />
                            <label forHTML="uploadPhotoForPost" className="fileLabel">Upload Photo</label>
                            {this.state.selectedFileImg.length > 0 && (
                            <div className="selectedImg">
                                <p>Selected Images:</p>
                                <ul>
                                {Array.from(this.state.selectedFileImg).map((file, index) => (
                                    <li key={index}>
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt={`Selected ${index}`}
                                        width="100"
                                        height="100"
                                    />
                                    <button id="removeSelectedImg" onClick={() => this.removeImage(index)}>X</button>
                                    </li>
                                ))}
                                </ul>
                            </div>
                            )}
                        </div>
                        <div className="postButton">
                            <input type="submit" value="Post" id="postButton" onChange={this.handleUpload} />
                        </div>
                    </div>
                    </form>
                </div>
                {this.state.post.map((post) => (
                  <div className="postedDiv">
                    <div>
                      <h2 className="postUI">{post.username}</h2>
                    </div>
                  
                  <div className="postP" style={{width: '90%', display: post.posttext ? 'flex' : 'none', justifyContent: 'center' }} ><textarea style={{width: '90%', border: 'none', minHeight:'130px',  maxHeight: '150px', overflowY: 'auto', resize: "none"}}>{post.posttext}</textarea></div>
                    <div className="postedIMGdiv">
                  {post.photos.map((imagePath, imageIndex) => (
                    <img
                    className="postedIMG"
                      key={imageIndex}
                      src={imagePath}
                      alt={`Image ${imageIndex + 1}`}
                    />
                  ))}
                  </div>
                  {/* Add more JSX to display other post details */}
                  </div>
                ))}
            </div>
        )
    }
}