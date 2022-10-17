import {GET_ALL_COUNTRIES} from '../actions/index';
import {GET_ALL_ACTIVITIES} from '../actions/index';
import {GET_COUNTRY_DETAIL} from '../actions/index';
import {CREATE_ACTIVITY} from '../actions/index';
import {GET_COUNTRIES_SUMMARY} from '../actions/index';
import {FILTER_BY_CONTINENT} from '../actions/index';
import {FILTER_BY_ACTIVITIES} from '../actions/index';

const initialState = {
    allcountries:[],
    countries: [],
    countryDetail: {},
    activities: [],
};

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_ALL_COUNTRIES:
            return{
                ...state,
                countries: action.payload,
                allcountries: action.payload
            };
        case GET_ALL_ACTIVITIES:
            return{
                ...state,
                activities: action.payload
            };
        case GET_COUNTRIES_SUMMARY:
            return{
                ...state,
                countries: action.payload
            };
        case GET_COUNTRY_DETAIL:
            return{
                ...state,
                countryDetail: action.payload
            };
        case CREATE_ACTIVITY:
            return{
                ...state,
                activities:[...state.activities, action.payload]
            };
        case FILTER_BY_CONTINENT:
            const allcountries = state.allcountries;
            const filterstatus = action.payload === "All"? allcountries :
            allcountries.filter(country => country.continent === action.payload)
            return{
                ...state,
                countries: filterstatus
            };
        case FILTER_BY_ACTIVITIES:
            const all_countries = state.allcountries;
            const filtercountries = action.payload === "All"? 
            all_countries.filter(country => country.tours.length > 0): 
            all_countries.filter(country => country.tours.find(tour => tour.name === action.payload));
            return {
                ...state,
                countries: filtercountries
            };
        default:
            return{
                ...state
            };
    }
};

export default rootReducer;