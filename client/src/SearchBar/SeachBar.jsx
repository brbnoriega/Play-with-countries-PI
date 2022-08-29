import React from 'react';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import { searchCountries } from '../actions';

import {Link} from 'react-router-dom';
import { getCountries} from '../actions/index.js';

import styles from '../SearchBar/SearchBar.module.css';

export default function SearchBar({setReload, setCurrentPage, reload}){  // me traigo el set reload del home

const dispatch = useDispatch()
 // ---reload---
 function handleReload(e){ 
  e.preventDefault(); // para que no se recargue la pag
  dispatch(getCountries());
  setReload({continent:"", sort: "", population:"", activities: "", search:""}) // actualizar estado de los filter y sort
  setCurrentPage(1)
}

//creo estado local: 
const [nameCountry, setNameCountry] = useState('')


function handleInputChange(e){ // setea el estaedo
  e.preventDefault();
  setNameCountry(e.target.value)
  setReload({search: e.target.value})
}

function handleSearch(search){//f para mostrar el country por search:
    if(search.charCode === 13){
      search.preventDefault();
      dispatch(searchCountries(search.target.value))
    setNameCountry(search.target.value)
    setReload({search: ""})
    // alert("You are searching: " + search.target.value);
    }
    }

    function handleInputSubmit(submit){
      submit.preventDefault();
      dispatch(searchCountries(nameCountry)); // name = estado local 
      
      setNameCountry("");
      setReload({search: ""})
    }
    

  return (  
  <div className={styles.background}>
  <button className={styles.buttonStyle} onClick= {e=> {handleReload(e)}}> ↺ </button> 
           <button className={styles.buttonStyle} type='text'  onClick={(submit) =>handleInputSubmit(submit)}> Search </button>
           <input value={reload.search} className={styles.search} type="search" placeholder='Search a Flag '
           
           
           onChange={(e)=>handleInputChange(e)}
           onKeyPress={(search)=>handleSearch(search)} 
           
           
           />
          
             <Link to = '/activities'> 
            <button className={styles.buttonStyle}> Create </button> 
            </Link>
           
                
               
          
            
        </div>
            
 )
}
 


