import React from "react";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import{getCountries, sortNames, filterContinent, sortPopulation, getActivities, filterActivities, filterCapital } from '../actions/index.js'
import Paginado from "../Paginado/Paginado.jsx";

import Cards from '../Cards/Cards.jsx';
import styles from '../Home/Home.module.css';
import SearchBar from "../SearchBar/SeachBar.jsx";


export default function Home(){

    const dispatch = useDispatch() // usar constante para dispatchar actions
    const allCountries = useSelector(state=> state.countries) //pido con la constnte todo lo que hay en el state de countries
    const activities = useSelector(state=> state.activities)
    //------PAGINADO(readme: 10 por pag)------------------------------------------------------------------------------
    const[pag, setCurrentPage]= useState(1)// 
    
    const [reload, setReload] = useState({continent:"", sort: "", population:"", activities:"", search:""}) // objeto porque son VARIOS
    const[coutriesPerPage, setCountriesPerPage] = useState(10) //cant x pag 
   
    const max = Math.ceil(allCountries.length / coutriesPerPage); //max array de countries / la cant de countries por pag 

    const sliceCountries = allCountries.slice((pag - 1)* coutriesPerPage, // 1 a 25
    (pag - 1) * coutriesPerPage + coutriesPerPage )

    const slicePagOne = allCountries.slice(0,9)

    useEffect(()=>{
        dispatch(getCountries())
        },[dispatch])

        const [order, setOrder] = useState('');
        useEffect(()=>{  
            dispatch(getCountries())
        },[dispatch]) 


        
        useEffect(()=>{  
            dispatch(getActivities())
        },[dispatch]) 


    //---handle sort Az- Za
        function handleSort(sort){ 
            sort.preventDefault()
             dispatch(sortNames(sort.target.value))// se ejecuta y toma como payload el valor del click del usuario
            setOrder(`Order by abc : ${sort.target.value}`)    
            setReload({sort: sort.target.value})
          }

    //----filtrado Continent-------
        function handleContinent(continent) {
            continent.preventDefault();
            dispatch(filterContinent(continent.target.value));
            setOrder(`Order by continent : ${continent.target.value}`)  
            setReload({continent: continent.target.value})
            setCurrentPage(1)
         }

         function handleCapital (capital){
            capital.preventDefault();
            dispatch(filterCapital(capital.target.value)); 
            // setOrder(`Order by capital : ${capital.target.value}`)  
            // setReload({capital: capital.target.value})
            // setCurrentPage(1)                                                                                                                                                                                                          
         }
    //----sort population-------

    function handlePopulation (population){
        population.preventDefault();
        dispatch(sortPopulation(population.target.value))
        setOrder(`Order by population : ${population.target.value}`)  
        setReload({population: population.target.value})
    }

 //----- Filter activitiers----

 function handleActivities(activities){
    activities.preventDefault();
    dispatch(filterActivities(activities.target.value))
    setOrder(`Order by activities : ${activities.target.value}`)  
    setReload({activities: activities.target.value})
    setCurrentPage(1)
 }

return(
<> 
 <SearchBar setReload={setReload} 
   setCurrentPage={setCurrentPage} 
   reload={reload}
   />    {/*lo mando a searchbar */}
    {/* sort */}  
    <div className={styles.optionStyle}>

  <div>
     <Paginado  className={styles.paginadoStyle} 
                      pag={pag}
                      setCurrentPage={setCurrentPage} 
                      max={max}
                  />
  </div>
           
    
        <div >      
        <label className={styles.font}>Sort Countries </label>
        <select className={styles.selectOrder} value={reload.sort} onChange={sort=>handleSort(sort)} >
                <option hidden value="">⇅</option> 
                <option className={styles.selectOrder} value='az'>A-Z</option> 
                <option className={styles.selectOrder} value='za'>Z-A</option>
        </select>
    </div>

       {/*---- filter continents----- */}
    <div >
            <label className={styles.font}>Continents </label>
            <select className={styles.selectOrder} value={reload.continent} onChange={continent=>handleContinent(continent)}>
            <option hidden value=''> All</option>
            <option className={styles.selectOrder} value="Asia"> Asia </option>
            <option className={styles.selectOrder} value="North America">North America</option>
            <option className={styles.selectOrder} value="Africa">Africa</option>
            <option className={styles.selectOrder} value="Antarctica">Antarctica</option>
            <option className={styles.selectOrder} value="Europe">Europe</option>
            <option className={styles.selectOrder} value="Oceania">Oceania</option>
            <option className={styles.selectOrder} value="South America">South America</option>
            </select>       
                
    </div>
        {/*----- filter population----- */}
    <div >
            <label className={styles.font}>Population </label>
            <select className={styles.selectOrder} value={reload.population} onChange={population=>handlePopulation(population)}>
            <option hidden value=""> ⇅ </option>
            <option className={styles.selectOrder} value="asc">Ascending</option>
            <option className={styles.selectOrder} value="desc">Descending</option>
          </select>
    </div>
    
            {/*----- activities----- */}
            <div>
            <label className={styles.font}>Activities </label>
            <select className={styles.selectOrder} value={reload.activities}onChange ={activities=>handleActivities(activities)}  id="">
            <option className={styles.selectOrder} hidden value=""> All</option>
           {activities?.map(actMap=>(<option className={styles.selectOrder} value={actMap.name}> {actMap.name}</option>) )}
           </select>

            </div>
            </div>


            {/* FILTER TEST */}
            <div>
                <label>Capitals</label>
                <select onChange={capital=> handleCapital (capital)}>
                <option hidden value="allCapital">All</option>
                      {allCountries?.map(mapeo=>(<option value={mapeo.capital} >{mapeo.capital}</option>))}
                </select>
              
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