import React from "react";
import Style from "./Loading.module.css";

const Loading = () => {
    
    return(
        <div className={Style.main}>
            <h1>Loading...</h1>
            <div className={Style.loader}></div>
        </div>
    )
};

export default Loading;