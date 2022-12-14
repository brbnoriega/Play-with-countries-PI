import {GET_COUNTRIES, ERROR, GET_NAMES_COUNTRIES, SORT_COUNTRIES, FILTER_CONTINENTS, SORT_POPULATION, GET_DETAILS, CLEAN_DETAIL, POST_ACTIVITIES, GET_ACTIVITIES, FILTER_ACTIVITIES, TEST_FILTER } from '../actions/index.js';

//un estado inicial
const initialState = {
    countries: [],
    allCountries: [],
    error: '',
    detail: [],
    activities: [],
  
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
                const sortByName = action.payload === 'za' ? sortCountry.sort(function(a,b){
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
    //sort population 
    case SORT_POPULATION:

        const sortPopulation = state.countries
        const sortByPopu = action.payload === 'desc' ? sortPopulation.sort(function(a,b){
        if(a.population > b.population){
            return -1;
        }
        if(b.name > a.name){
            return 1;
        }
        return 0
    }): sortPopulation.sort(function(a,b){
        if(a.population > b.population){
            return 1;
        }
        if(b.population> a.population){
            return -1;
        }
        return 0;
    })
        return{
        ...state,
        countries: sortByPopu
    }
    case GET_DETAILS:{
        return{
            ...state,
            detail: action.payload
        }
    }
    case CLEAN_DETAIL:{
        return{
            ...state,
            detail: action.payload
        }
    }
    case POST_ACTIVITIES:
            return{
                ...state,
            }


    case GET_ACTIVITIES:
        return{
            ...state,
            activities: action.payload
        }

        case FILTER_ACTIVITIES: 
            const filterAct =  action.payload === 'activities'
            ? state.allCountries
            : state.allCountries.filter(
                (filter) =>
                filter.activities &&
                filter.activities.filter((act) => act.name === action.payload).length
              )
          
            return{
                ...state,
                countries: filterAct
            }

            //test filter capital

            case TEST_FILTER:
                const filterCapitals = state.allCountries
                const filtrando = action.payload === 'allCapital' ? filterCapitals : filterCapitals.filter(f=> f.capital === action.payload)
            console.log(action.payload)
                return {
                    ...state,
                    countries: filtrando
                }

    default:
    return state;
}
}
export default rootReducer;
