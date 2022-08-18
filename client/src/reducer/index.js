import {GET_COUNTRIES, ERROR, GET_NAMES_COUNTRIES, SORT_COUNTRIES, FILTER_CONTINENTS} from '../actions/index.js';

//un estado inicial
const initialState = {
    countries: [],
    allCountries: [],
    error: '',
   
}

function rootReducer(state = initialState, action){

    switch(action.type){
        
        case GET_COUNTRIES:
        return{
            ...state,
            countries: action.payload,
            allCountries: action.payload
        }
        case ERROR:
        return{
            ...state,
           error: action.payload
        }
        //------------searchbar filter
        case GET_NAMES_COUNTRIES:
            return{
            ...state,
            countries: action.payload 
            }
        //-------------sort
            case SORT_COUNTRIES:
                const sortCountry = state.countries
                const sortByName = action.payload === 'za' ? sortCountry.sort((a,b)=>{
                if(a.name > b.name){
                    return -1;
                }
                if(b.name > a.name){
                    return 1;
                }
                return 0
            }): sortCountry.sort(function(a,b){
                if(a.name > b.name){
                    return 1;
                }
                if(b.name> a.name){
                    return -1;
                }
                return 0;
            })
                return{
                ...state,
                countries: sortByName
            }
       //--------filter continents------
       case FILTER_CONTINENTS:
        const all = state.allCountries
        const filterContinents = action.payload === 'All Continents' ? all : all.filter(filtCont => filtCont.continent === action.payload)
    
        return{
            ...state,
            countries: filterContinents
          }
    
    default:
    return state;
}
}
export default rootReducer;
