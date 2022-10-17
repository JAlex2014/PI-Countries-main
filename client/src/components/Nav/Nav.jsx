//import {Link} from "react-router-dom";
import { NavLink } from "react-router-dom";
//import Search from "../Search/Search";
import Style from "./Nav.module.css";

const Nav = () => {
    return(
        <header className="nav">
            <nav>
                <div className={Style.navbar}>
                    <div className={Style.navlinks}>
                        <NavLink to="/countries">Home</NavLink>
                        <NavLink to="/activities">Activities</NavLink>
                        <NavLink to="/activities/create">CreateTour</NavLink>
                        <NavLink to='/about'>About</NavLink>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Nav;