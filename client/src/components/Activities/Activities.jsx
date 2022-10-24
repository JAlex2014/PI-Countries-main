import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllActivities } from "../../redux/actions/index";
import {deleteActivity} from "../../redux/actions/index";
import Style from "./Activities.module.css";

const Activities = () => {

    const dispatch = useDispatch();
    const activities = useSelector(state => state.activities);
    
    React.useEffect(() => {dispatch(getAllActivities())},
    [dispatch]);
    
    const handlerDelete = async (event, name) =>{
        event.preventDefault();
        dispatch(deleteActivity(name));
        alert(`The activity ${name} has been deleted successfully`);
    }

    return(
        <div className={Style.mainContainer}>
            <h1>Tours around the world</h1>
            <div className={Style.Container}>
                    {activities.map(activitie =>(
                        <div className={Style.activitie}>
                            <h3>{activitie.name}</h3>
                            <p>{`Difficulty: ${activitie.difficulty}/5`}</p>
                            <p>{`Duration: ${activitie.duration}`}</p>
                            <p>{`Season: ${activitie.season}`}</p>
                            <h4>Countries:</h4>
                                {activitie.countries?.map(countrie =>
                                    <p>{countrie.name}</p>
                                )}
                        <button onClick={(event) => handlerDelete(event,activitie.name)}>Delete</button>
                        </div>
                    ))}
            </div>
        </div>
    )
}
export default Activities;