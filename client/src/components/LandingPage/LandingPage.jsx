import React from "react";
import {Link} from 'react-router-dom';
import Style from './LandingPage.module.css';

export default function LandingPage(){
    return(
        <div className={Style.landing}>
            <h1>Bienvenidos a mi Proyecto Individual</h1>
            <Link to = "/countries">
                <button>Ingresar</button>
            </Link>
        </div>
    );
}