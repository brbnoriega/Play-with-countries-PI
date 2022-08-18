import React from 'react';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import { searchCountries } from '../actions';
import styles from '../SearchBar/SearchBar.module.css';

export default function SearchBar({setCurrentPage}){

const dispatch = useDispatch()

//creo estado local: 
const [nameCountry, setNameCountry] = useState('')

//f para mostrar el country por search:

function handleSearch(search){
   
  
    if(search.charCode === 13){

            search.preventDefault();
          dispatch(searchCountries(search.target.value))
        
    setNameCountry(search.target.value)
        alert("You are searching: " + search.target.value);
    }
    }


  return (  
          <div>
         <ul><input className={styles.search} type="search" placeholder='Search a Flag ' onKeyPress={(search)=>handleSearch(search)} /></ul>
       
                <label className={styles.icon}>
                <span className={styles.iconSearch}></span>
                </label> 
             
            </div>

 )
}
 


