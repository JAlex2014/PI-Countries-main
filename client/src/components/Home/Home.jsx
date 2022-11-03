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
import {SetPaginadoGlobal} from "../../redux/actions/index";

const Home = () => {

    const dispatch = useDispatch();
    const countries = useSelector(state => state.countries);
    const loading = useSelector(state => state.loading);
    
    /*DEFINO ESTADOS LOCALES NECESARIOS**************************************/
  
    //DEFINO ESTE ESTADO PARA PODER INDICAR EL CAMBIO EN EL HANDLER Y *******/
    //RENDERIZAR ASÍ EL ORDENAMIENTO*****************************************/
    
    // eslint-disable-next-line
    const [orden, setOrden] = useState('');
   
    //TRAIGO UN COPIA LOCAL DE MI ESTADO CURRENTPAGE, INICIALIZADO EN 1******/
    //EN MI ESTADO GLOBAL DEL REDUCER****************************************/
    const currentPage = useSelector(state => state.actualPage);

    //ESTE ESTADO ME SIRVE PARA PODER DAR ESTILO TIPO HOVER AL***************/
    //BOTÓN DEL PAGINADO DE LA PÁGINA EN LA QUE SE ENCUENTRE*****************/
    const [activated, setActivated] = useState({
       [currentPage]: true,
    });
    
    //SETEO UN ESTADO LOCAL PARA USAR EN EL PAGINADO*************************/
    // eslint-disable-next-line
    const [countriesPerPage, setcountriesPerPage] = useState(9.99);
    /************************************************************************/

    /*LÓGICA PARA EL PAGINADO************************************************/
    const indexOfLastCountry = currentPage * countriesPerPage;//10
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;//0
    const currentCountries = currentPage===1?countries.slice(0,9):
    currentPage===26?countries.slice(249,countries.length):
    countries.slice(indexOfFirstCountry,indexOfLastCountry);
    /************************************************************************/

    const paginadoHandler = (pageNumber) => {
        dispatch(SetPaginadoGlobal(pageNumber))
    }; 
   
    /*FUNCION PARA MOSTRAR EL BOTON DEL PAGINADO ACTUAL CON ESTILO************/
    const paginadoActivated = (value = 1) => {
    const clicked = value;
    setActivated({
            [clicked]: true,
        });
    };
    /*************************************************************************/
    
    /*USO EL USEEFFECT PARA RENDERIZAR SIEMPRE Y CADA VEZ QUE HAYA************/
    /*UN CAMBIO EN EL ARRAY DE COUNTRIES Y SI TENGO EL ARRAY DE COUNTRIES*****/
    /*CON ELEMENTOS, NO NECESITO RE-RENDERIZARLO, ESTO ES UTIL PARA MANTENER**/
    /*LOS FILTROS*************************************************************/
    React.useEffect(() => {if(countries.length===0){
            dispatch(actions.getAllCountries())
        }
    },[dispatch,countries.length]);
    /*************************************************************************/
    
    return(
        <div className={Style.home}>
            <div className={Style.filtersandpag}>
                <Search             paginadoActivated={paginadoActivated}/>

                <FiltersnOrdering   setOrden={setOrden}
                                    paginadoActivated={paginadoActivated}/>

                {(typeof countries !== "string") && <Pagination countriesPerPage={countriesPerPage}
                                    countries={countries.length}
                                    paginadoHandler={paginadoHandler} 
                                    currentPage={currentPage}
                                    paginadoActivated={paginadoActivated}   
                                    activated={activated}/>   }
            </div>     
            <div className={currentCountries.length && Style.allCards}> 
                {loading?(<Loading/>):((typeof countries !== "string"))?/* currentCountries.length?  */
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