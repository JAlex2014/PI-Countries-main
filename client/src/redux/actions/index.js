import axios from 'axios';

export const GET_ALL_COUNTRIES = "GET_ALL_COUNTRIES";
export const GET_COUNTRY_DETAIL = "GET_COUNTRY_DETAIL";
export const CREATE_ACTIVITY = "CREATE_ACTIVITY";

export const getAllCountries = () => {
    return function(dispatch){
        return axios.get("http://localhost:3001/countries")
            .then(response => response.data)
            .then(data => dispatch({type:GET_ALL_COUNTRIES, payload: data}));
    };
};

export const getCountryDetail = (id) =>{
    return function(dispatch){
        return axios.get(`http://localhost:3001/countries/${id}`)
                .then(response => response.data)
                .then(data => dispatch({type:GET_COUNTRY_DETAIL, payload: data}));
    };
};

export const createActivity = (values) => {
    return {type: CREATE_ACTIVITY, payload: {...values}}
};

