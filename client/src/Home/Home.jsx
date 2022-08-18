import React from "react";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import{getCountries, sortNames, filterContinent} from '../actions/index.js'

import Navbar from "../NavBar/NavBar.jsx";
import Cards from '../Cards/Cards.jsx';
import styles from '../Home/Home.module.css';


export default function Home(){

    const dispatch = useDispatch() // usar constante para dispatchar actions
    const allCountries = useSelector(state=> state.countries) //pido con la constnte todo lo que hay en el state de countries
    
    useEffect(()=>{
        dispatch(getCountries())
        
        },[dispatch])

        const [order, setOrder] = useState('');
        useEffect(()=>{  
            dispatch(getCountries())
        },[dispatch]) 


    //---handle sort Az- Za
        function handleSort(sort){ 
            sort.preventDefault()
             dispatch(sortNames(sort.target.value))// se ejecuta y toma como payload el valor del click del usuario
            setOrder(`Order by sort : ${sort.target.value}`)    
          }

    //----filtrado Continent
      
        function handleContinent(continent) {
            continent.preventDefault();
            dispatch(filterContinent(continent.target.value));
           
         }

          
return(
<>
<div><Navbar/></div>

    {/* sort */}  
    <div className={styles.sort}>      
        <select onChange={sort=>handleSort(sort)}>
                <option hidden value="">Alphabetical order</option> 
                <option value='az'>Top down A-Z</option> 
                <option value='za'>Bottom up Z-A</option>
        </select>
    </div>

       {/*---- filter continents----- */}
    <div className={styles.filter}>
            <select onChange={continent=>handleContinent(continent)}>
            <option hidden value=""> All Continents </option>
            <option value="Asia"> Asia </option>
            <option value="North America">North America</option>
            <option value="Africa">Africa</option>
            <option value="Antarctica">Antarctica</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
            <option value="South America">South America</option>
            </select>           
    </div>
        {/* filter population */}
    <div>
          <select>
            <option  hidden value=""> Population </option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
    </div>


{/* ----cards------ */}
 <div className={styles.cardHome}>
{
        allCountries.map((countries)=>{
                    return(
                        <Cards
                        id= {countries.id}
                        name = {countries.name}
                        imgFlag= {countries.imgFlag}
                        continent={countries.continent}
                  
                        />
      )
    })
}

</div>
</>

)




}