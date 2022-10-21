import React from "react";
import { useState } from "react";
import Style from "./Pagination.module.css"


const Pagination = ({countriesPerPage, countries, paginadoHandler, setcurrentPage,currentPage }) => {
    const pageNumbers = [];

    const [activated, setActivated] = useState({
        1: true
      })

    const handlerClick = (event, number) => {
        paginadoHandler(number);
        setActivated({
          [event.target.name]: true,
        });
      };
    
    const handlePrev = (event) => {
        event.preventDefault();
        setActivated({
            [currentPage-1]: true,
          });
        setcurrentPage(currentPage - 1);
        };

    const handleNext =(event)=> {
        event.preventDefault();
        setActivated({
            [currentPage+1]: true,
          });
        setcurrentPage(currentPage + 1);
        };

    for (let i=0; i < Math.ceil(countries/countriesPerPage); i++){
        pageNumbers.push(i+1);
    }

   

    return(
        <div className={Style.container}>
            <button  className={Style.buttonprev}onClick={handlePrev} disabled={currentPage === 1}>Prev</button>
            <ul className={Style.numbers}>
                {
                    pageNumbers?.map(number => (
                    <div  key={number}>
                    <button name={number} value={currentPage}
                        className={activated[number]?Style.buttonactual : Style.button} 
                        onClick={(event) => handlerClick(event,number)}>{number}</button>
                    </div>))
                }
            </ul>
            <button onClick={handleNext} disabled={currentPage === Math.ceil(countries/countriesPerPage)}>Next</button>
        </div>
    )
};

export default Pagination;

