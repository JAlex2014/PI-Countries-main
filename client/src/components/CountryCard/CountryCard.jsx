import {Link} from "react-router-dom"

const CountryCard = ({name,id,img,continent}) => {
    return(
        <div className = "CountryCard">
            <img src={img} alt={"Img not found"}/>
            <Link to={`countries/${id}`}>
                <h2>{name}</h2>
            </Link>
            <h4>Continent: {continent}</h4>
        </div>
    )
};
export default CountryCard;
