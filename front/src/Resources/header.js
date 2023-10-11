import React from "react";
import Logo from "./Photo/logo.png"
import './header.css'

export default function HeaderOne() {
    return(
        <header>
            <img src={Logo} alt="Tbilisi State university" />
            <div className="hOnes">
                <h1>თბილისის სახელმწიფო უნივერსიტეტი</h1>
                <h1>Tbilisi State University</h1>
            </div>
        </header>
    )
}