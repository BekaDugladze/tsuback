import React from "react";
import './enroll.css'
import { NavLink } from "react-router-dom";

export default function Enroll() {
    return(
        <div className="info">
            <h2>INFO</h2>
            <br></br>
            <p>
                This is my vision of the Students’ Portal of Tbilisi State University. 
                <br></br>    So feel free and enroll now!
            </p>
            <NavLink to='/register'> Enroll Now!</NavLink>
        </div>
    )
}