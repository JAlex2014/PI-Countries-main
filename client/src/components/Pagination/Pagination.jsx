import React from "react";
import Style from "./Pagination.module.css";
import {SetPaginadoGlobal} from "../../redux/actions/index";
import { useDispatch } from "react-redux";

const Pagination = ({ countriesPerPage, 
                      countries, 
                      paginadoHandler, 
                      currentPage, 
                      paginadoActivated,
                      activated }) => {

    const dispatch = useDispatch();
    const pageNumbers = [];

    const handlerClick = (event, number) => {
      event.preventDefault();
      paginadoHandler(number);
      paginadoActivated(event.target.name)
    };
    
    const handlePrev = (event) => {
      event.preventDefault();
      paginadoActivated(currentPage - 1);
      dispatch(SetPaginadoGlobal(currentPage - 1))
    }; 

    const handleNext =(event)=> {
      event.preventDefault();
      paginadoActivated(currentPage+1);
      dispatch(SetPaginadoGlobal(currentPage + 1))
    };

    for (let i=0; i<Math.ceil(countries/countriesPerPage); i++){
        pageNumbers.push(i+1);
    }

    return(
        <div className={Style.container}>
            <button className={Style.buttonprevnext} 
                    onClick={handlePrev} 
                    disabled={currentPage === 1}>Prev</button>
            <ul className={Style.numbers}>
                {
                    pageNumbers?.map(number => (
                    <div  key={number}>
                        <button name={number} 
                                value={currentPage}
                                className={activated[number]?
                                  Style.buttonactual:
                                  Style.button} 
                                onClick={(event) => 
                                handlerClick(event,number)}
                                >{number}</button>
                    </div>))
                }
            </ul>
              <button className={Style.buttonprevnext} 
                      onClick={handleNext} 
                      disabled={!countries || (currentPage === Math.ceil(countries/countriesPerPage))}>Next</button>
        </div>
    )
};

export default Pagination;

