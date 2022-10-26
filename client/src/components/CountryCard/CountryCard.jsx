import {Link} from "react-router-dom";
import Style from "./CountryCard.module.css";
import { imgNA,imgANT,imgAS,imgSA,imgOCE,imgEUO,imgAFR} from "../ConstsandHelpers";

const CountryCard = ({name,id,img,continent,population}) => {
    return(
        <div className = {Style.CountryCard}>
            <img className={Style.img} src={img} alt={"Img not found"}/>
            <Link className={Style.namecountry} to={`countries/${id}`}>
                <h2>{name}</h2>
            </Link>
            <h4 className={Style.titlecontinent}>Continent: {continent}</h4>
            <>
            {   
                continent==="North America"?<img src={imgNA} alt="IMG" width="40px"height="40px"/>:
                continent==="Antarctica"?<img src={imgANT} alt="IMG" width="40px"height="40px"/>:
                continent==="Asia"?<img src={imgAS} alt="IMG" width="40px"height="40px"/>:
                continent==="South America"?<img src={imgSA} alt="IMG" width="40px"height="40px"/>:
                continent==="Oceania"?<img src={imgOCE} alt="IMG" width="40px"height="40px"/>:
                continent==="Europe"?<img src={imgEUO} alt="IMG" width="40px"height="40px"/>:
                <img src={imgAFR} alt="IMG" width="40px"height="40px"/>
            }
            </>
            <p className={Style.numbers}>Population: {new Intl.NumberFormat('en-US').format(population)}</p>
            <p>{population===0?`💀`:
                population<1000000?`👨🏽`:
                population<10000000?`👨🏽👨🏽`:
                population<100000000?`👨🏽👨🏽👨🏽`:
                population<500000000?`👨🏽👨🏽👨🏽👨🏽`:"👨🏽👨🏽👨🏽👨🏽👨🏽"}
            </p>
            <Link className = {Style.Link} to={`countries/${id}`}>
            <button className = {Style.detailbutton}>See details</button>
            </Link>
        </div>
    )
};
export default CountryCard;
