import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllActivities } from "../../redux/actions/index";

const Activities = () => {
    const dispatch = useDispatch();
    const activities = useSelector(state => state.activities);
    React.useEffect(() => {dispatch(getAllActivities())},
    [dispatch]);

    return(
        <div>
            <h1>Tours around the world</h1>
                {activities.map(activitie =>(
                    <div>
                        <h3>{activitie.name}</h3>
                        <p>{`Difficulty: ${activitie.difficulty}/5`}</p>
                        <p>{`Duration: ${activitie.duration}`}</p>
                        <p>{`Season: ${activitie.season}`}</p>
                        <h4>Countries:</h4>
                            {activitie.countries?.map(countrie =>
                                <p>{countrie.name}</p>
                            )}
                    </div>
                ))}
        </div>
    )
}
export default Activities;