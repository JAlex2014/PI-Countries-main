import * as actions from  "./../../redux/actions/index";
import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CountryCard from "../CountryCard/CountryCard";
import Search from "../Search/Search";
import FiltersnOrdering from "../Filters&Ordering/Filters&Ordering"
import Pagination from "../Pagination/Pagination";
import Style from "./Home.module.css"

const Home = () => {
    const dispatch = useDispatch();
    const countries = useSelector(state => state.countries);
    
    //Defino estados y constantes para usar en el paginado
    const [currentPage,setcurrentPage] = useState(1);
    const [countriesPerPage] = useState(10);
    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
    
    const currentCountries = countries.slice(indexOfFirstCountry,indexOfLastCountry); 
    const paginadoHandler = (pageNumber) => {
        setcurrentPage(pageNumber)
    }
    
    React.useEffect(() => {dispatch(actions.getAllCountries())},
    [dispatch]);
    
    //React.useEffect(() => {dispatch(actions.getCountriesSummary(input))},[dispatch, input]);
        return(
            <div>
                <Search setcurrentPage={setcurrentPage}/>
                <FiltersnOrdering setcurrentPage={setcurrentPage}/>
                <Pagination countriesPerPage={countriesPerPage}
                countries={countries.length}
                paginadoHandler={paginadoHandler}/> 
                <div className={Style.allCards}>
                    <>
                        {currentCountries?.map(country => <CountryCard
                        key = {country.id}
                        name = {country.name}
                        id = {country.id}
                        img = {country.flag_img}
                        continent = {country.continent}/>)}
                    </>
                </div>
            </div>
        );    
}
export default Home;