import React from "react";
import {imgNotFoundurl} from "../ConstsandHelpers"
import { useHistory } from "react-router-dom";


const NotFound = () => {
    const history = useHistory();
    const handlerClearSearch = () => {
        history.go(0);
    };

    return(
        <div>
            <h1>Hola bro, me renderizo si tu búsqueda no encuentra nada</h1>
            <button onClick={handlerClearSearch}>Clear Search</button>
            <img src = {imgNotFoundurl} alt ="IMG"/>
            
            
        </div>
    )
};

export default NotFound;