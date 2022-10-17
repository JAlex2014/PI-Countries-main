import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {filterCountriesByContinent} from "../../redux/actions/index";
import {filterCountriesByActivities} from "../../redux/actions/index";
import {continents} from "../Consts";
import {getAllActivities} from "../../redux/actions/index";

const FiltersnOrdering = ({setcurrentPage}) => {
    const dispatch = useDispatch();

    const activities = useSelector(state => state.activities);

    const handlerFilterContinent = (event) => {
        dispatch(filterCountriesByContinent(event.target.value))
        setcurrentPage(1);
    };

    const handlerFilterActivities = (event) => {
        dispatch(filterCountriesByActivities(event.target.value))
        setcurrentPage(1);
    };
    
    React.useEffect(() => {dispatch(getAllActivities())},
    [dispatch]);

    return(
        <div>
            <select defaultValue={"default"}>
                <option hidden selected>Order by ABCs</option>
                <option value="up">From A to Z</option>
                <option value="down">From Z to A</option>
            </select>
            <select defaultValue={"default"}>
                <option hidden selected>Order by Population</option>
                <option value="more">From most to least</option>
                <option value="less">From least to most</option>
            </select>
            <select defaultValue={"default"} onChange={handlerFilterContinent}> 
                <option hidden selected>Filter by Region</option>
                {continents.map(continent =>
                    <option key={continent} value={continent}>{continent}</option>)}
            </select>
            <select defaultValue={"default"} onChange={handlerFilterActivities}>
                <option hidden selected>Filter by Activities</option>
                <option value="All">All</option>
                {activities.map(activitie =>
                    <option key={activitie.id} value={activitie.name}>{activitie.name}</option>)}
            </select>
        </div>
    )
}
export default FiltersnOrdering;