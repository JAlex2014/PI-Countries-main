//import {Link} from "react-router-dom";
import { NavLink } from "react-router-dom";
import Search from "../Search/Search";
import Style from "./Nav.module.css";
import {Route} from 'react-router-dom';
import {useState} from 'react';
const Nav = () => {
    // eslint-disable-next-line
    const [currentPage,setcurrentPage] = useState(1);

    return(
        <header className="nav">
            <nav>
                <div className={Style.navbar}>
                    <div >
                        <NavLink to="/countries" className={Style.main}>Home🌎</NavLink>
                        <NavLink to="/activities" className={Style.main}>Activities</NavLink>
                        <NavLink to="/activities/create" className={Style.main}>CreateTour</NavLink>
                        <NavLink to='/about' className={Style.main}>About</NavLink>
                        <Route 
                        exact path={"/countries"} component = {()=><Search setcurrentPage={setcurrentPage}/>}/>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Nav;