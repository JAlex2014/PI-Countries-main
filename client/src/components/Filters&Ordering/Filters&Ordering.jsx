import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {continents} from "../ConstsandHelpers";
import {useHistory} from 'react-router'

//Importo mis funciones de mis actios que filtran y ordenan

import {getAllActivities} from "../../redux/actions/index";
import {filterCountriesByContinent} from "../../redux/actions/index";
import {filterCountriesByActivities} from "../../redux/actions/index";
import {OrderbyABCs} from "../../redux/actions/index"; 
import {OrderbyPopulation} from "../../redux/actions/index";
import {SetPaginadoGlobal} from "../../redux/actions/index";

import Style from "./Filtersordering.module.css";

const FiltersnOrdering = ({setOrden, paginadoActivated}) => {

    const history = useHistory();
    const dispatch = useDispatch();
    const activities = useSelector(state => state.activities);

    const handlerOrdering = (event) => {
        switch(event.target.value){
            case "up": 
                dispatch(OrderbyABCs(event.target.value))
                //Seteo mi pagina a la 1
                dispatch(SetPaginadoGlobal(1))
                //Al cambiar el orden con este setOrden se puede visualizar
                //el cambio en el componente Home que tiene las cards
                setOrden(`Ordenado ${event.target.value}`)
                //Seteo el estilo del boton de la pagina 1
                paginadoActivated();
                break;
            case "down":
                dispatch(OrderbyABCs(event.target.value))
                dispatch(SetPaginadoGlobal(1))
                setOrden(`Ordenado ${event.target.value}`)
                paginadoActivated();
                break; 
            case "more":
                dispatch(OrderbyPopulation(event.target.value))
                dispatch(SetPaginadoGlobal(1))
                setOrden(`Ordenado ${event.target.value}`)
                paginadoActivated();
                break;
            case "less":
                dispatch(OrderbyPopulation(event.target.value))
                dispatch(SetPaginadoGlobal(1))
                setOrden(`Ordenado ${event.target.value}`)
                paginadoActivated();
                break;
            default:
                break;
        }
    };

    const handlerFilterContinent = (event) => {
        dispatch(filterCountriesByContinent(event.target.value))
        dispatch(SetPaginadoGlobal(1))
        paginadoActivated();
    };

    const handlerFilterActivities = (event) => {
        dispatch(filterCountriesByActivities(event.target.value))
        dispatch(SetPaginadoGlobal(1))
        paginadoActivated();
    };

    const handlerClearFilter = () => {
        history.go(0);
        dispatch(SetPaginadoGlobal(1))
        paginadoActivated();
    };

    React.useEffect(() => {dispatch(getAllActivities())},
    [dispatch]);

    return(
        <div className={Style.main}>
            <select defaultValue="default" className={Style.select} onChange={handlerOrdering}>
                <option hidden value="default">Order by</option>
                <option value="up">From Albania to Zimbabwe</option>
                <option value="down">From Zimbabwe to Albania</option>
                <option value="more">From most to least populated</option>
                <option value="less">From least to most populated</option>
            </select>
            
            <select defaultValue="default" className={Style.select} onChange={handlerFilterContinent}> 
                <option hidden value="default">Filter by Region</option>
                {continents.map(continent =>
                    <option key={continent} value={continent}>{continent}</option>)}
            </select>

            <select defaultValue="default" className={Style.select} onChange={handlerFilterActivities}>
                <option hidden value="default">Filter by Activities</option>
                <option value="All">All activities</option>
                {activities.map(activitie =>
                    <option key={activitie.id} value={activitie.name}>{activitie.name}</option>)}
            </select>

            <button className={Style.button} onClick={handlerClearFilter}>Clear Filters</button>
        </div>
    )
}
export default FiltersnOrdering;