import {GET_ALL_COUNTRIES} from '../actions/index';
import {GET_COUNTRY_DETAIL} from '../actions/index';
import {CREATE_ACTIVITY} from '../actions/index';

const initialState = {
    countries: [],
    countryDetail: {},
    activities: [],
};

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_ALL_COUNTRIES:
            return{
                ...state,
                countries: action.payload
            };

        case GET_COUNTRY_DETAIL:
            return{
                ...state,
                countryDetail: action.payload
            }
        case CREATE_ACTIVITY:
            return{
                ...state,
                activities:[...state.activities, action.payload]
            }   
        default:
            return{
                ...state
            };
    }
};

export default rootReducer;