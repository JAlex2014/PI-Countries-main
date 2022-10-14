import {Link} from "react-router-dom"

const CountryCard = ({name,id,img,continent,capital}) => {
    return(
        <div className = "CountryCard">
            <hr/>
            <img src={img} alt={"Default png"}/>
            <Link to={`countries/${id}`}>
                <h2>{name}</h2>
            </Link>
            <h4>{continent}</h4>
            <hr/>
        </div>
    )
};
export default CountryCard;
