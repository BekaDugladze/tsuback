import React, { Component } from "react";
import './css/messengerTab.css';
import { useState, useEffect } from "react";

export default class MessengerTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasMessages: true,
            isVisible: false,
        };
    }

    componentDidMount() {
        // Check for buttons with the class "message" after the component is mounted
        const buttons = document.querySelectorAll('.message');
        if (buttons.length > 0) {
            this.setState({ hasMessages: false });
        }
    }
    handleVisible = () => {
        this.setState((previous) => ({
            isVisible: !previous.isVisible
        }))
    }
    render() {
        return (
            <div className="messengerTab">
                <button className="messengerTabButton" onClick={this.handleVisible}>Messages <span className="material-symbols-outlined">chat</span></button>
                {this.state.isVisible ? <div className="messengerTabMessages"> 
                {this.state.hasMessages ? <h3>You have no message</h3>  : ''}
                {/*<button className="message">someone</button>
                <button className="message">someone</button>
                <button className="message">someone</button>
                <button className="message">someone</button>
        <button className="message">someone</button>*/}
                </div> : ''}
            </div>
        )
    }
}
