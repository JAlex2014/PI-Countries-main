import React from "react";
import * as actions from "./../../redux/actions/index";
import { useSelector } from "react-redux"; // ≈ a mapStatetoProps
import { useDispatch } from "react-redux"; // ≈ a mapDispatchtoProps
import { useHistory } from "react-router-dom";

const CountryDetail = (props) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const CountryId = props.match.params.id;

    React.useEffect(() => 
        {dispatch(actions.getCountryDetail(CountryId))},
        [dispatch,CountryId]
    );

    const countryDetail = useSelector(state => state.countryDetail);

    return(
        <div>
            <button onClick={()=>history.goBack()}>Back</button>
            <h1>{countryDetail.name}</h1>
            <img src={countryDetail.flag_img} alt="Default png"/>
            <h2>{countryDetail.continent}</h2>
            <h3>Country ID: {countryDetail.id}</h3>
            <h3>Capital: {countryDetail.capital}</h3>
            <h3>Subregion: {countryDetail.subregion?countryDetail.subregion:"None"}</h3>
            <h3>Area: {`${new Intl.NumberFormat('en-US').format(countryDetail.area)} km²`}</h3>
            <h3>Population: {new Intl.NumberFormat('en-US').format(countryDetail.population)}</h3>
            <h3>Tours:</h3>
            <hr/>
                {countryDetail.tours?.map(tour => 
                    <div>
                        <p>Activity name: {tour.name}</p>
                        <p>Difficulty: {`${tour.difficulty}/5`}</p> 
                        <p>Duration: {tour.duration}</p>
                        <p>Season: {tour.season}</p>
                        <hr/>
                    </div>
                )}
            
            {console.log(countryDetail)}
        </div>
    )
};

export default CountryDetail;