import LogIn from "./Index/LogIn";
import HeaderOne from "./header";
import Enroll from "./Index/enroll";
import React from "react";
import './css/setupTest.css'

export default function FirstPage() {

    return (
        <>
        <HeaderOne />
        <div className="main">
            <LogIn />
            <Enroll />
        </div>
        </>
    )
}