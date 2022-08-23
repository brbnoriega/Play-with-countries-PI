import React from "react";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import{getCountries, sortNames, filterContinent, sortPopulation } from '../actions/index.js'
import Paginado from "../Paginado/Paginado.jsx";
import Navbar from "../NavBar/NavBar.jsx";
import Cards from '../Cards/Cards.jsx';
import styles from '../Home/Home.module.css';


export default function Home(){

    const dispatch = useDispatch() // usar constante para dispatchar actions
    const allCountries = useSelector(state=> state.countries) //pido con la constnte todo lo que hay en el state de countries
    
    //------PAGINADO(readme: 10 por pag)------------------------------------------------------------------------------
    const[pag, setCurrentPage]= useState(1)// 
    
    const[coutriesPerPage, setCountriesPerPage] = useState(10) //cant x pag 
   
    const max = Math.ceil(allCountries.length / coutriesPerPage); //max array de countries / la cant de countries por pag 

    const sliceCountries = allCountries.slice((pag - 1)* coutriesPerPage, // 1 a 25
    (pag - 1) * coutriesPerPage + coutriesPerPage )

    const slicePagOne = allCountries.slice(1,10)

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
            setOrder(`Order by abc : ${sort.target.value}`)    
          }

    //----filtrado Continent-------
      
        function handleContinent(continent) {
            continent.preventDefault();
            dispatch(filterContinent(continent.target.value));
            setOrder(`Order by continent : ${continent.target.value}`)  
         }

    //----sort population-------

    function handlePopulation (population){
        population.preventDefault();
        dispatch(sortPopulation(population.target.value))
        setOrder(`Order by population : ${population.target.value}`)  
    }

   


return(

    
<> 

 <div><Navbar/> </div>
    {/* sort */}  
    <div className={styles.optionStyle}>
        <div >      
        <label>Alphabetical order</label>
        <select  onChange={sort=>handleSort(sort)} >
                <option hidden value="">Sort</option> 
                <option value='az'>Top down A-Z</option> 
                <option value='za'>Bottom up Z-A</option>
        </select>
    </div>

       {/*---- filter continents----- */}
    <div >
            <label>All Continents</label>
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
        {/*----- filter population----- */}
    <div >
            <label>Population</label>
            <select onChange={population=>handlePopulation(population)}>
            <option hidden value=""> Population </option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
    </div>
    </div>
    {/* -----Paginado----- */}
            <div>
        <Paginado   
            pag={pag}
            setCurrentPage={setCurrentPage} 
            max={max}
        />
        </div>
        
{/* ----cards------ */}

 <div className={styles.cardHome}>
{ pag === 1 ?
     slicePagOne.map((countries)=>{
                    return(
                        <Cards
                        key={countries.id}
                        id= {countries.id}
                        name = {countries.name}
                        imgFlag= {countries.imgFlag}
                        continent={countries.continent}
                        />
      )
    }): sliceCountries.map((countries)=>{
        return(
            <Cards
            key={countries.id}
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