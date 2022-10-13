import React from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../redux/actions/index";
import axios from "axios";

const CreateTour = (props) => {

    const [state,setState] = React.useState({
        name: "",
        difficulty: 0,
        duration: "",
        season: "",
        countries: [],
    });

    const dispatch = useDispatch();
    
    const handlerChange = (event) =>{
        setState({
            ...state,
            [event.target.name]: event.target.value
        })
    }

     const handlerSubmit = (event) => {
        event.preventDefault();
        let newTour = dispatch(actions.createActivity(state)).payload;
        axios.post("http://localhost:3001/activities", newTour);
        //console.log(newTour);
        setState({
            name: "",
            difficulty: 0,
            duration: "",
            season: "",
            countries: [],
        })
    } 

    return (
        <div>
            <form onSubmit={handlerSubmit}>
                <label>Name: </label>
                <input type="text" name="name" onChange={handlerChange} value={state.name}/>

                <label>difficulty: </label>
                <select name="difficulty" onChange={handlerChange} value={state.difficulty}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>

                <label>duration: </label>
                <input type="text" name="duration" onChange={handlerChange} value={state.duration}/>

                <label>season: </label>
                <select name="season" onChange={handlerChange} value={state.season} >
                    <option value="Summer">Summer</option>
                    <option value="Spring">Spring</option>
                    <option value="Winter">Winter</option>
                    <option value="Fall">Fall</option>
                </select>

                <label>Countries: </label>
                <input type="text" name="countries" onChange={handlerChange} value={state.countries}/>

                <button type="submit">Create Activity</button>
            </form>
        </div>
    )
};

export default CreateTour;
