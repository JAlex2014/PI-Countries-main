import React from "react";
import * as actions from "./../../redux/actions/index";
import { useSelector } from "react-redux"; // ≈ a mapStatetoProps
import { useDispatch } from "react-redux"; // ≈ a mapDispatchtoProps

const CountryDetail = (props) => {

    const dispatch = useDispatch();

    const CountryId = props.match.params.id;

    React.useEffect(() => 
        {dispatch(actions.getCountryDetail(CountryId))},
        [dispatch,CountryId]
    );

    const countryDetail = useSelector(state => state.countryDetail);

    return(
        <div>
            <h1>{countryDetail.name}</h1>
            <img src={countryDetail.flag_img} alt="Default png"/>
            <h2>{countryDetail.continent}</h2>
            <h3>{countryDetail.id}</h3>
            <h3>Capital: {countryDetail.capital}</h3>
            <h3>Subregion: {countryDetail.subregion?countryDetail.subregion:"None"}</h3>
            <h3>Area: {`${countryDetail.area} km²`}</h3>
            <h3>Population: {countryDetail.population}</h3>
            <h3>Tours: 
            <hr/>
                {countryDetail.tours?.map(tour => 
                    <div>
                        <h4>Activity name: {tour.name}</h4>
                        <p>Difficulty: {`${tour.difficulty}/5`}</p> 
                        <p>Duration: {tour.duration}</p>
                        <p>Season: {tour.season}</p>
                        <hr/>
                    </div>
                )}
            </h3>
            {console.log(countryDetail)}
        </div>
    )
};

export default CountryDetail;