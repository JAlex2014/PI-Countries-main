import React from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../redux/actions/index";
import { useSelector } from "react-redux"; 
import axios from "axios";

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

    const handlerChange = (event) =>{
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
        let newTour = dispatch(actions.createActivity(state)).payload;
        axios.post("http://localhost:3001/activities", newTour);
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
            countries: state.countries.filter(country => country !== event.target.value)
        })
    }

    const arr_difficulties = [1,2,3,4,5];
    const arr_seasons = ["Summer", "Spring", "Winter", "Fall"];
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
                    {arr_difficulties.map(number => <option key={number} value={number}>{number}</option>)}
                </select>
                </div>

                <div>
                <label>Duration: </label>
                <input type="text" name="duration" onChange={handlerChange} value={state.duration}/>
                </div>

                <div>
                    <label>Season: </label>
                    <select name="season" onChange={handlerChange} value={state.season}>
                        <option hidden selected>Select a season</option>
                        {arr_seasons.map(season => <option key={season} value={season}>{season}</option>)}
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
