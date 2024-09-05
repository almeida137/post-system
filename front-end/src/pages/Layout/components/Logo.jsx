import React from "react";
import Logo from './assets/Logo.jpg';


const LogoP = () => {
    return (
        <div className="logo">
            <div className="logo-icon">
                <img className="logo-black" src={Logo} alt="logo" />
            </div>
        </div>
    );
};

export default LogoP;