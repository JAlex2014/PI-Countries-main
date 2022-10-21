import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions/index";
import { difficulties, seasons, duration} from "../ConstsandHelpers";
import Style from "./CreateTour.module.css";


const CreateTour = () => {

    const dispatch = useDispatch();
    const activities = useSelector(state => state.activities);
    const tours_names = activities.map(activitie=>activitie.name);
    const allcountries = useSelector(state => state.allcountries);

    React.useEffect(() => {dispatch(actions.getAllCountries())},[dispatch]);
    React.useEffect(() => {dispatch(actions.getAllActivities())},[dispatch]);
    
    const [state,setState] = React.useState({
        name: "",
        difficulty: 0,
        duration: "",
        season: "",
        countries: [],
    });

    const [errors,setErrors] = React.useState({
        name:"",
    });

    const validate=(state)=>{
        let errors={};
        const regex =  (/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g);
        let name_repeated = tours_names.filter(name => name === state.name);
        if(!state.name) errors.name="Activity name is required";
        else if(name_repeated.length) errors.name=`The activity >>${state.name}<< was already created`;
        else if(!regex.test(state.name))
        errors.name="Activity name is invalid, simbols or one character are not allowed";
        console.log(name_repeated);
        return errors;
    }
    
    const handlerChangeName = (event) => {
        let value = event.target.value;
        value = value.charAt(0).toUpperCase() + value.slice(1);
        const property = event.target.name;
        setState({...state,[property]: value});
        setErrors(validate({...state,[property]: value}));
    }

    const handlerChange = (event) => {
        const value = event.target.value;
        const property = event.target.name;
        setState({...state,[property]: value});
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
        alert('The activity has been created successfully');
    } 
 
    const handlerDelete = (event)=>{
        setState({
            ...state,
            countries: state.countries.filter(country => 
                country !== event.target.value)
        })
    }

    /* const allcountries = useSelector(state => state.countries); */
    
    return (
        <div className={Style.main}>
            <div className={Style.title}>CREATE YOUR CUSTOMIZED ACTIVITY</div>
            <form className={Style.form} onSubmit={handlerSubmit}>
                <div className={Style.containerA}>
                    <label className={Style.label}>Name: </label>
                        <input type="text" 
                            name="name"
                            onChange={handlerChangeName} 
                            placeholder={"Here goes the activity's name"} 
                            value={state.name}
                            className={Style.inputname}
                            required/>
                            {errors.name &&<p className={Style.danger}>{errors.name}</p>}
                
                    <label className={Style.label}>Difficulty: </label>
                        <div className={Style.select}>
                            <select className={Style.dropdown} 
                                name="difficulty" 
                                onChange={handlerChange} 
                                value={state.difficulty}>
                                <option hidden selected>Select from 1 to 5</option>
                            {difficulties.map(number => <option key={number} value={number}>{number}</option>)}
                            </select>
                        </div>

                    <label className={Style.label}>Duration: </label>
                        <div className={Style.select}>
                            <select className={Style.dropdown} 
                                name="duration" 
                                onChange={handlerChange} 
                                value={state.duration}>
                                <option hidden selected>Set the duration</option>
                            {duration.map(time => <option key={time} value={time}>{time}</option>)}
                            </select>
                        </div>

                    <label className={Style.label}>Season: </label>
                        <div className={Style.select}>
                            <select className={Style.dropdown} 
                                name="season" 
                                onChange={handlerChange} 
                                value={state.season}>
                                <option hidden selected>Select a season</option>
                            {seasons.map(season => <option key={season} value={season}>{season}</option>)}
                            </select>
                        </div>
                </div>

                <div className={Style.containerB}>
                <label className={Style.labelB}>Countries: </label>
                    <div className={Style.select}>
                        <select className={Style.dropdown} name="countries" onChange={handlerSelectCountry} >
                            <option hidden selected>Select one or more countries</option>
                            {allcountries.map(country => 
                            <option key={country.id} value={country.name}>{country.name}</option>)}
                        </select>
                        {!state.countries.length &&<p className={Style.danger}>Select at least one Country</p>}
                    </div>
                    <div>
                        {state.countries.map(country =>
                        <div key={country}>{country}
                            <button value={country} onClick={handlerDelete}>X</button>
                        </div>
                        )}
                    </div>
                
                    <button className={Style.button}
                        disabled={!state.name || errors.name || !state.difficulty || !state.duration || !state.season || !state.countries.length}
                        type="submit">Create Activity
                    </button>
                    {(!state.name || errors.name || !state.difficulty || !state.duration || !state.season || !state.countries.length) && 
                    <p className={Style.danger}>Button disabled, one or more fields are empty</p>}
                </div>
            </form>
        </div>
    ) 
};

export default CreateTour;
