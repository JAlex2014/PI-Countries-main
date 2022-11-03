import React from "react";
import * as actions from "./../../redux/actions/index";
import { useSelector } from "react-redux"; // ≈ a mapStatetoProps
import { useDispatch } from "react-redux"; // ≈ a mapDispatchtoProps
import { useHistory } from "react-router-dom";
import NotFound from "../NotFound/NotFound";
import Style from "./CountryDetail.module.css";
import Loading from "../Loading/Loading";
import { imgNA,imgANT,imgAS,imgSA,imgOCE,imgEUO,imgAFR,
        sqrmetters,location,imgcontinents} from "../ConstsandHelpers";
import { Link } from "react-router-dom";

const CountryDetail = (props) => {

    const dispatch = useDispatch();
    const history = useHistory();
    const loading = useSelector(state => state.loading);
    const CountryId = props.match.params.id;

    React.useEffect(() => 
        {dispatch(actions.getCountryDetail(CountryId))},
        [dispatch,CountryId]
    );

    const countryDetail = useSelector(state => state.countryDetail);

    return(
        <div className={Style.main}>
            {loading?(<Loading/>):Object.entries(countryDetail).length === 0?<NotFound/>:
            <>  <button onClick={()=>history.goBack()}>Back</button>
                <div className={Style.Detail}>
                    <div className={Style.flagContainer}>
                        <img className={Style.flagimg} src={countryDetail.flag_img} alt="Default png"/>
                        <h1 className={Style.countryname} >{countryDetail.name}</h1>
                    </div>
                    <div className={Style.dataContainer}>
                        <div className={Style.rowContainer}>
                            <h2 className={Style.idtitle}>{countryDetail.continent.toUpperCase()}</h2>
                            {   
                                countryDetail.continent==="North America"?
                                <img src={imgNA} alt="IMG" width="70px"height="70px"/>:
                                countryDetail.continent==="Antarctica"?
                                <img src={imgANT} alt="IMG" width="70px"height="70px"/>:
                                countryDetail.continent==="Asia"?
                                <img src={imgAS} alt="IMG" width="70px"height="70px"/>:
                                countryDetail.continent==="South America"?
                                <img src={imgSA} alt="IMG" width="70px"height="70px"/>:
                                countryDetail.continent==="Oceania"?
                                <img src={imgOCE} alt="IMG" width="70px"height="70px"/>:
                                countryDetail.continent==="Europe"?
                                <img src={imgEUO} alt="IMG" width="70px"height="70px"/>:
                                <img src={imgAFR} alt="IMG" width="70px"height="70px"/>
                            }
                        </div>

                        <div className={Style.rowContainer}>
                            <h3 className={Style.idtitle}>COUNTRY ID: {countryDetail.id}</h3>
                            <img src={countryDetail.flag_img}alt="IMG" width="38px"height="35px"/>
                        </div>
                        <div className={Style.rowContainer}>
                            <h3>CAPITAL: {countryDetail.capital}</h3>
                            <img src={location} alt="IMG" width="38px"height="35px"/>
                        </div>

                        <div className={Style.rowContainer}>
                            <h3 className={Style.idtitle}>SUBREGION: {countryDetail.subregion?countryDetail.subregion:"None"}</h3>
                            <img src={imgcontinents} alt="IMG" width="40px"height="40px"/>
                        </div>
                            
                        <div className={Style.rowContainer}>
                            <h3>AREA: {`${new Intl.NumberFormat('en-US').format(countryDetail.area)} km²`}</h3>
                            <img src={sqrmetters} alt="IMG" width="40px"height="40px"/>
                        </div>
                        <div className={Style.rowContainer}>
                            <h3 className={Style.idtitle}>POPULATION: {`${new Intl.NumberFormat('en-US').format(countryDetail.population)} hab.`}</h3>
                        </div>
                        <div className={Style.rowContainer}>
                            <p className={Style.people}>{countryDetail.population===0?`💀`:
                                countryDetail.population<1000000?`👳`:
                                countryDetail.population<10000000?`👳👳`:
                                countryDetail.population<100000000?`👳👳👳`:
                                countryDetail.population<500000000?`👳👳👳👳`:"👳👳👳👳👳"}
                            </p>
                        </div>
                        <div className={Style.toursContainer}>
                            <h3>TOURS:</h3>
                            
                                {countryDetail.tours.length?
                                    countryDetail.tours.map(tour => 
                                    <div>
                                        <p>Activity name: {tour.name}</p>
                                        <p>Difficulty: {`${tour.difficulty}/5`}</p> 
                                        <p>Duration: {tour.duration}</p>
                                        <p>Season: {tour.season}</p>
                                    </div>):
                                    <div>
                                        <h4>No tours yet for this country,</h4>
                                        <h4>Want to create one?</h4>
                                        <Link to={{pathname: "/activities/create"}}>
                                        <button>Create New Tour</button>
                                        </Link>
                                    </div>}
                        </div>
                    </div>
                </div>
            </>}
        </div>
    )
};

export default CountryDetail;