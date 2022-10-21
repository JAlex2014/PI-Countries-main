import * as actions from  "./../../redux/actions/index";
import React from "react";
import {useState } from "react";
import {useSelector, useDispatch } from "react-redux";
import CountryCard from "../CountryCard/CountryCard";
import FiltersnOrdering from "../Filters&Ordering/Filters&Ordering";
import Search from "../Search/Search";
import NotFound from "../NotFound/NotFound.jsx";
import Pagination from "../Pagination/Pagination";
import Loading from "../Loading/Loading";
import Style from "./Home.module.css"

const Home = () => {
    const dispatch = useDispatch();
    const countries = useSelector(state => state.countries);
    const loading = useSelector(state => state.loading);
    //Defino este estado para poder renderizar los ordenamientos 
    //alfabeticos y por población
    // eslint-disable-next-line
    const [orden, setOrden] = useState('');
    //Defino este estado y constantes para usar en el paginado
    const [currentPage,setcurrentPage] = useState(1);
    // eslint-disable-next-line
    const [countriesPerPage, setcountriesPerPage] = useState(9.99);
    
    const indexOfLastCountry = currentPage * countriesPerPage;//10
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;//0
    
    const currentCountries = currentPage===1?countries.slice(0,9):
    currentPage===26?countries.slice(249,countries.length):
    countries.slice(indexOfFirstCountry,indexOfLastCountry); 

    const paginadoHandler = (pageNumber) => {
        setcurrentPage(pageNumber);
    };
   
    React.useEffect(() => {dispatch(actions.getAllCountries())},
    [dispatch]);
    
    return(
        <div className={Style.home}>
            <div className={Style.filtersandpag}>
                <Search setcurrentPage={setcurrentPage}/>
                <FiltersnOrdering   setcurrentPage={setcurrentPage} 
                                    setOrden={setOrden}
                />
                <Pagination     countriesPerPage={countriesPerPage}
                                countries={countries.length}
                                paginadoHandler={paginadoHandler}
                                setcurrentPage={setcurrentPage}
                                currentPage={currentPage}
                />  
            </div>     
            <div className={currentCountries.length && Style.allCards}> 
                {loading?(<Loading/>):currentCountries.length? 
                    currentCountries.map(country => 
                    <CountryCard    key = {country.id}
                                    name = {country.name}
                                    id = {country.id}
                                    img = {country.flag_img}
                                    continent = {country.continent}
                                    population= {country.population}
                />):<NotFound/>} 
            </div> 
        </div>
    );    
}
export default Home;