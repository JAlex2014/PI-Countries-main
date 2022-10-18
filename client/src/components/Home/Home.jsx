import * as actions from  "./../../redux/actions/index";
import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CountryCard from "../CountryCard/CountryCard";
import FiltersnOrdering from "../Filters&Ordering/Filters&Ordering"
import NotFound from "../NotFound/NotFound";
import Pagination from "../Pagination/Pagination";
import Search from "../Search/Search";
import Style from "./Home.module.css"

const Home = () => {
    const dispatch = useDispatch();
    const countries = useSelector(state => state.countries);
    //Defino este estado para poder renderizar los ordenamientos 
    //alfabeticos y por población
    // eslint-disable-next-line
    const [orden, setOrden] = useState('');
    //Defino este estado y constantes para usar en el paginado
    const [currentPage,setcurrentPage] = useState(1);
    // eslint-disable-next-line
    const [countriesPerPage, setcountriesPerPage] = useState(10);
    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
    
    const currentCountries = countries.slice(indexOfFirstCountry,indexOfLastCountry); 
    const paginadoHandler = (pageNumber) => {
        setcurrentPage(pageNumber)
    }
    

    React.useEffect(() => {dispatch(actions.getAllCountries())},
    [dispatch]);
    
    return(
        <div>
            <Search setcurrentPage={setcurrentPage} />
            <FiltersnOrdering setcurrentPage={setcurrentPage} setOrden={setOrden}/>
            <Pagination countriesPerPage={countriesPerPage}
                countries={countries.length}
                paginadoHandler={paginadoHandler}/>   
            <div className={Style.allCards}>
                {!currentCountries.length? <NotFound/>:
                currentCountries.map(country => 
                <CountryCard 
                    key = {country.id}
                    name = {country.name}
                    id = {country.id}
                    img = {country.flag_img}
                    continent = {country.continent}
                    population= {country.population}
                />)}
            </div>  
        </div>
    );    
}
export default Home;