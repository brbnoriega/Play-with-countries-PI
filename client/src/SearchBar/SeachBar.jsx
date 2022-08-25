import React from 'react';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import { searchCountries } from '../actions';

import {Link} from 'react-router-dom';
import { getCountries} from '../actions/index.js';
import styles from '../SearchBar/SearchBar.module.css';

export default function SearchBar({setReload}){  // me traigo el set reload del home

const dispatch = useDispatch()

 // ---reload---
 function handleReload(e){
  e.preventDefault(); // para que no se recargue la pag
  dispatch(getCountries());
setReload({continent:"", sort: ""})
}

//creo estado local: 
const [nameCountry, setNameCountry] = useState('')

//f para mostrar el country por search:

function handleSearch(search){
   
  
    if(search.charCode === 13){

            search.preventDefault();
          dispatch(searchCountries(search.target.value))
    setNameCountry(search.target.value)
    search.target.value=''
        // alert("You are searching: " + search.target.value);
    }
    }


  return (  
          <div className={styles.background}>

            
       
           <button className={styles.buttonStyle} onClick= {e=> {handleReload(e)}}> ↺ </button> 
           
            <input className={styles.search} type="search" placeholder='Search a Flag ' onKeyPress={(search)=>handleSearch(search)} />
             <Link to = '/activities'> 
            <button className={styles.buttonStyle}> Create </button> 
            </Link>
           
                <label className={styles.icon}>
                <span className={styles.iconSearch}></span>
                </label> 
               

               
            </div>

 )
}
 


