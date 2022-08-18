import axios from 'axios';

export const GET_COUNTRIES = 'GET_COUNTRIES';
export const ERROR = 'ERROR';
export const GET_NAMES_COUNTRIES = 'GET_NAMES_COUNTRIES';
export const SORT_COUNTRIES = 'SORT_COUNTRIES';
export const FILTER_CONTINENTS = 'FILTER_CONTINENTS';


export function getCountries(){
    return async function(dispatch){ 
        // try{
             var getRest = await axios.get('http://localhost:3001/countries')

             return dispatch({
                    type: GET_COUNTRIES,
                    payload: getRest.data
             })
            // }
        // }catch(error){
        // // console.log(error) // manejar en reducer el error ------ 
        // return {
        //     type: 'ERROR',
        //     payload: error 
        // }
        // }    
        }
        }

//------ searchBar------------------------------------------
export function searchCountries (name){
    return async function(dispatch){
        try{
            let nameCountries = await axios(`http://localhost:3001/countries?name=${name}`)

            console.log(nameCountries)

            return dispatch({
                type: GET_NAMES_COUNTRIES,
                payload: nameCountries.data
            });
            
        }catch(error){
            throw alert('Countrie Not Found!')
        }
        }   
    }
//-----sort----------------------------------------------
    export function sortNames(payload){
        return{
            type: SORT_COUNTRIES,
           payload
        }
    }
//-----filter Continents-------------------------------
export function filterContinent(payload){
    return{
      type: FILTER_CONTINENTS,
      payload
    }
  }