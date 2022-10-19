import React from "react";
import Style from "./Pagination.module.css"

const Pagination = ({countriesPerPage, countries, paginadoHandler}) => {
    const pageNumbers = [];
    for (let i=0; i < Math.ceil(countries/countriesPerPage); i++){
        pageNumbers.push(i+1);
    }
    return(
        <nav>
            <ul className={Style.numbers}>
                {
                    pageNumbers?.map(number => (
                    <div  key={number}>
                    <button type="button"
                      className={Style.button} 
                      autofocus onClick={()=>paginadoHandler(number)}>{number}</button>
                    </div>))
                }
            </ul>
        </nav>
    )
};

export default Pagination;

/* return <button 
className={number === actualPage ? styles.pagActual : styles.pagOther} 
onClick={() => paginado(number)} key={number}>{number}</button> */