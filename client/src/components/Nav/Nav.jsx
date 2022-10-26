//import {Link} from "react-router-dom";
import { NavLink } from "react-router-dom";
import Style from "./Nav.module.css";

const Nav = () => {
    
    return(
        <header className="nav">
            <nav>
                <div className={Style.navbar}>
                    <div >
                        <NavLink to="/countries" className={Style.main}>Home🌎</NavLink>
                        <NavLink to="/activities" className={Style.main}>Activities</NavLink>
                        <NavLink to="/activities/create" className={Style.main}>CreateTour</NavLink>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Nav;