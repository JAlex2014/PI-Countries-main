import axios from 'axios';

export const GET_ALL_COUNTRIES = "GET_ALL_COUNTRIES";
export const GET_COUNTRY_DETAIL = "GET_COUNTRY_DETAIL";
export const GET_COUNTRIES_SUMMARY = "GET_COUNTRIES_SUMMARY";
export const CREATE_ACTIVITY = "CREATE_ACTIVITY";

export const getAllCountries = () => {
    return async function(dispatch){
        let response = await axios.get("http://localhost:3001/countries");
        return dispatch({type:GET_ALL_COUNTRIES, payload: response.data});
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
    return {type: CREATE_ACTIVITY, payload: {...values}}
};

