import React from "react";
import {Link} from 'react-router-dom';
import Style from './LandingPage.module.css';

export default function LandingPage(){
    return(
        <div className={Style.landing}>
            <h2 className={Style.title}>WELCOME TO MY PROJECT</h2>
                <div className={Style.textcontainer}>
                    <p className={Style.text}>This is a project for the Henry Bootcamp
                        in wich you will find up to 250 countries 
                        all over the world, you can filter them, click to see
                        specific information from that country and create 
                        an activiy for these countries trough a form.
                    </p>
                </div>
            <Link to = "/countries">
                <span className={Style.button}>START</span>
            </Link>
        </div>
    );
}