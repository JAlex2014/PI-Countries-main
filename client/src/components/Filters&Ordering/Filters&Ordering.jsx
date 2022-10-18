import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {continents} from "../ConstsandHelpers";
import {getAllActivities} from "../../redux/actions/index";
import { useHistory } from 'react-router'
//Importo mis funciones de mis actios que filtran y ordenan
import {filterCountriesByContinent} from "../../redux/actions/index";
import {filterCountriesByActivities} from "../../redux/actions/index";
import {OrderbyABCs} from "../../redux/actions/index"; 
import {OrderbyPopulation} from "../../redux/actions/index";

const FiltersnOrdering = ({setcurrentPage, setOrden}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const activities = useSelector(state => state.activities);

    
    const handlerOrdering = (event) => {
        switch(event.target.value){
            case "up": 
                dispatch(OrderbyABCs(event.target.value))
                setcurrentPage(1);
                setOrden(`Ordenado ${event.target.value}`)
                return;
            case "down":
                dispatch(OrderbyABCs(event.target.value))
                setcurrentPage(1);
                setOrden(`Ordenado ${event.target.value}`)
                return; 
            case "more":
                dispatch(OrderbyPopulation(event.target.value))
                setcurrentPage(1);
                setOrden(`Ordenado ${event.target.value}`)
                return;
            case "less":
                dispatch(OrderbyPopulation(event.target.value))
                setcurrentPage(1);
                setOrden(`Ordenado ${event.target.value}`)
                return;
            default:
                return;
        }
    };

    const handlerFilterContinent = (event) => {
        dispatch(filterCountriesByContinent(event.target.value))
        setcurrentPage(1);
    };

    const handlerFilterActivities = (event) => {
        dispatch(filterCountriesByActivities(event.target.value))
        setcurrentPage(1);
    };

    const handlerClearFilter = () => {
        history.go(0);
        setcurrentPage(1);
    };

    React.useEffect(() => {dispatch(getAllActivities())},
    [dispatch]);

    return(
        <div>
            <select onChange={handlerOrdering}>
                <option hidden selected>Order by</option>
                <option value="up">From Albania to Zimbabwe</option>
                <option value="down">From Zimbabwe to Albania</option>
                <option value="more">From most to least populated</option>
                <option value="less">From least to most populated</option>
            </select>
            <select onChange={handlerFilterContinent}> 
                <option hidden selected>Filter by Region</option>
                {continents.map(continent =>
                    <option key={continent} value={continent}>{continent}</option>)}
            </select>
            <select onChange={handlerFilterActivities}>
                <option hidden selected>Filter by Activities</option>
                <option value="All">All activities</option>
                {activities.map(activitie =>
                    <option key={activitie.id} value={activitie.name}>{activitie.name}</option>)}
            </select>
            <button onClick={handlerClearFilter}>Clear Filters</button>
        </div>
    )
}
export default FiltersnOrdering;