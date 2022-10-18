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


export const getAllCountries = () => {
    return async function(dispatch){
        let response = await axios.get("http://localhost:3001/countries");
        return dispatch({type:GET_ALL_COUNTRIES, payload: response.data});
    };
};
export const getAllActivities = () => {
    return async function(dispatch){
        let response = await axios.get("http://localhost:3001/activities");
        return dispatch({type:GET_ALL_ACTIVITIES, payload: response.data});
    };
};

export const getCountryDetail = (id) => {
    return async function(dispatch){
        let response = await axios.get(`http://localhost:3001/countries/${id}`)
        return dispatch({type:GET_COUNTRY_DETAIL, payload: response.data});
    };
};

export const getCountriesSummary = (name) =>{
    return function(dispatch){
        return axios.get(`http://localhost:3001/countries?name=${name}`)
                .then(response => response.data)
                .then(data => dispatch({type:GET_COUNTRIES_SUMMARY, payload: data}));
    };
};

export const createActivity = (values) => {
    return async function(dispatch){
        await axios.post("http://localhost:3001/activities", values); 
        return dispatch( {type: CREATE_ACTIVITY, payload: values})
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

