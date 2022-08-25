import axios from 'axios';
export const GET_COUNTRIES = 'GET_COUNTRIES';
export const ERROR = 'ERROR';
export const GET_NAMES_COUNTRIES = 'GET_NAMES_COUNTRIES';
export const SORT_COUNTRIES = 'SORT_COUNTRIES';
export const FILTER_CONTINENTS = 'FILTER_CONTINENTS';
export const SORT_POPULATION = 'SORT_POPULATION';
export const FILTER_BY_ACT = 'FILTER_BY_ACT';
export const GET_ACTIVITIES= 'GET_ACTIVITIES';
export const GET_DETAILS = 'GET_DETAILS';
export const CLEAN_DETAIL= 'CLEAN_DETAIL';
export const POST_ACTIVITIES = 'POST_ACTIVITIES';
export const FILTER_ACTIVITIES = 'FILTER_ACTIVITIES';


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

//-----sort population

export function sortPopulation(payload){
return{
    type: SORT_POPULATION,
    payload
}
}

//------filter actdb
export function filterByActDb (payload){
    return{
        type: FILTER_BY_ACT,
        payload
    }
}

//----detail-----
export function getDetail(id){

     return async function(dispatch){
                    try{
                        var localHostId = await axios.get('http://localhost:3001/countries/' + id);
                        return dispatch({
                            type: GET_DETAILS,
                            payload: localHostId.data
                        })
                    }catch(error){
                    console.log(error)
                }
                }
            }
//-----cleanDetail----
export function cleanDetail (payload){
    return{
        type: CLEAN_DETAIL,
        payload
    }
}

//postAct para el form:
export function postAct(payload){
return async function (){
    var response = await axios.post('http://localhost:3001/', payload) //lo que me llega al front
    return response;
};
}

//----activities------
export function getActivities(){
    return async function(dispatch){
        var getAct = await axios.get('http://localhost:3001/activities')
        return dispatch({
            type: GET_ACTIVITIES,
            payload: getAct.data
     })
    }
}

//---------------- filter activities----------
export function filterActivities(payload){
    return{
      type: FILTER_ACTIVITIES,
      payload
    }
  }