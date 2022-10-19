import {Link} from "react-router-dom";
import Style from "./CountryCard.module.css";

const CountryCard = ({name,id,img,continent,population}) => {


    return(
        <div className = {Style.CountryCard}>
            <img className={Style.img} src={img} alt={"Img not found"}/>
            <Link className={Style.namecountry} to={`countries/${id}`}>
                <h2>{name}</h2>
            </Link>
            <h4>Continent: {continent}</h4>
            <p>Population: {new Intl.NumberFormat('en-US').format(population)}</p>
            <Link className = {Style.Link} to={`countries/${id}`}>
            <button className = {Style.detailbutton}>See details</button>
            </Link>
        </div>
    )
};
export default CountryCard;
