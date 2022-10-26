import axios from 'axios';

export const GET_ALL_COUNTRIES = "GET_ALL_COUNTRIES";
export const GET_ALL_ACTIVITIES = "GET_ALL_ACTIVITIES";
export const GET_COUNTRY_DETAIL = "GET_COUNTRY_DETAIL";
export const GET_COUNTRIES_SUMMARY = "GET_COUNTRIES_SUMMARY";
export const CREATE_ACTIVITY = "CREATE_ACTIVITY";
export const FILTER_BY_CONTINENT = "FILTER_BY_CONTINENT";
export const FILTER_BY_ACTIVITIES = "FILTER_BY_ACTIVITIES";
export const ORDER_BY_ABC = "ORDER_BY_ABC";
export const ORDER_BY_POPULATION = "ORDER_BY_POPULATION";
export const LOADING = "LOADING";
export const DELETE_ACTIVITY = "DELETE_ACTIVITY";
export const PAGINADO = "PAGINADO";
    
export const getAllCountries = () => {
    return async function(dispatch){
        dispatch(loading());
        let response = await axios.get("/countries");
        return dispatch({type:GET_ALL_COUNTRIES, payload: response.data});
    };
};

export const getAllActivities = () => {
    return async function(dispatch){
        let response = await axios.get("/activities");
        return dispatch({type:GET_ALL_ACTIVITIES, payload: response.data});
    };
};

export const getCountryDetail = (id) => {
    return async function(dispatch){
        try{
            dispatch(loading());
            let response = await axios.get(`/countries/${id}`);
            return dispatch({type:GET_COUNTRY_DETAIL, payload: response.data});
        }catch(error){
            return dispatch({type:GET_COUNTRY_DETAIL, payload: {}});
        }
    };
};

export const getCountriesSummary = (name) =>{
    return async function(dispatch){
        try{
            let response = await axios.get(`/countries?name=${name}`);
            return dispatch({type:GET_COUNTRIES_SUMMARY, payload: response.data});
        }catch(error){
            return dispatch({type:GET_COUNTRIES_SUMMARY, payload: error.message});
        }
    };
};

export const createActivity = (values) => {
    return async function(dispatch){
        await axios.post("/activities", values); 
        return dispatch( {type: CREATE_ACTIVITY, payload: values})
    }
};

export const deleteActivity = (name) => {
    return async function(dispatch){
        await axios.delete("/activities", {data:{name}}); 
        return dispatch( {type: DELETE_ACTIVITY, payload: name})
    }
};

export const filterCountriesByContinent = (payload) => {
    return {type: FILTER_BY_CONTINENT, payload}
};

export const filterCountriesByActivities = (payload) => {
    return {type: FILTER_BY_ACTIVITIES, payload}
};

export const OrderbyABCs = (payload) => {
    return {type: ORDER_BY_ABC, payload}
};

export const OrderbyPopulation = (payload) => {
    return {type: ORDER_BY_POPULATION, payload}
};

export const SetPaginadoGlobal = (payload) => {
    return {type: PAGINADO, payload}
};

export const loading = () => {
    return {type: LOADING};
};

