//import {Link} from "react-router-dom";
import { NavLink } from "react-router-dom";
//import Search from "../Search/Search";
import Style from "./Nav.module.css";

const Nav = () =>{
    return(
        <header className="nav">
            <img id="paises" src={"https://st2.depositphotos.com/3725083/5485/i/950/depositphotos_54856347-stock-photo-travel-the-world-monument-concept.jpg"} 
            width="600" height="200" className="l" alt=""/>
            <nav>
                <div className={Style.navbar}>
                    <div className={Style.navlinks}>
                        <NavLink to="/countries">Home</NavLink>
                        <NavLink to="/activities/create">CreateTour</NavLink>
                        <NavLink to='/about'>About</NavLink>
                    </div>
                   
                </div>
            </nav>
        </header>
    );
};

export default Nav;