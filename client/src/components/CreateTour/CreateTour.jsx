import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions/index";
import { difficulties, seasons, duration} from "../ConstsandHelpers";

const CreateTour = () => {

    const dispatch = useDispatch();
    
    React.useEffect(() => {dispatch(actions.getAllCountries())},[dispatch]);

    const [state,setState] = React.useState({
        name: "",
        difficulty: 0,
        duration: "",
        season: "",
        countries: [],
        allcountries: [],
    });

    const handlerChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        })
    }

    const handlerSelectCountry = (event) => {
        setState({
            ...state,
            countries: [...new Set([...state.countries, event.target.value])]
        })
    }

    const handlerSubmit = (event) => {
        event.preventDefault();//blablabla...
        dispatch(actions.createActivity(state));
        setState({
            name: "",
            difficulty: 0,
            duration: "",
            season: "",
            countries: [],
        })
    } 

    const handlerDelete = (event)=>{
        setState({
            ...state,
            countries: state.countries.filter(country => 
                country !== event.target.value)
        })
    }

    const allcountries = useSelector(state => state.countries);
    
    return (
        <div>
            <form onSubmit={handlerSubmit}>
                <div>
                <label>Name: </label>
                <input type="text" name="name" onChange={handlerChange} 
                        placeholder={"Here goes the activity's name"} value={state.name}/>
                </div>
                
                <div>
                <label>Difficulty: </label>
                <select name="difficulty" onChange={handlerChange} value={state.difficulty}>
                    <option hidden selected>Select from 1 to 5</option>
                    {difficulties.map(number => <option key={number} value={number}>{number}</option>)}
                </select>
                </div>

                <div>
                    <label>Duration: </label>
                    <select name="duration" onChange={handlerChange} value={state.duration}>
                        <option hidden selected>Set the duration</option>
                        {duration.map(time => <option key={time} value={time}>{time}</option>)}
                    </select>
                </div>

                <div>
                    <label>Season: </label>
                    <select name="season" onChange={handlerChange} value={state.season}>
                        <option hidden selected>Select a season</option>
                        {seasons.map(season => <option key={season} value={season}>{season}</option>)}
                    </select>
                </div>

                <div>
                    <label>Countries: </label>
                    <select name="countries" onChange={handlerSelectCountry} >
                        <option hidden selected>Select one or more countries</option>
                        {allcountries.map(country => 
                            <option key={country.id} value={country.name}>{country.name}</option>)}
                    </select>
                </div>
                <div>
                    {state.countries.map(country =>
                         <div key={country}>{country}
                            <button value={country} onClick={handlerDelete}>X</button>
                         </div>
                        )}
                </div>

                <button type="submit">Create Activity</button>
            </form>
        </div>
    ) 
};

export default CreateTour;
