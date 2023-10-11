import React from "react";
import HeaderAcc from "./account/headerAcc";
import LeftNavBar from "./account/leftNavBar";
import "./css/account.css"
import { Component } from "react";
import MessengerTab from "./account/messengerTab";
import Feed from "./account/feed";
import Register from "./register";
import FirstPage from "./starting";

export default class Acc extends Component{
    render(){
    return(
        <div>
            <HeaderAcc 
            className="headerAccCss" 
            />
            <LeftNavBar 
            className="leftNavBar"
    />
            <MessengerTab 
            className="messengerTabAcc"
    />
            <Feed />
        </div>
    )
    }
}