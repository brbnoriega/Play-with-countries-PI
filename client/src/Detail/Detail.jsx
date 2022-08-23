import React from "react";
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { getDetail, cleanDetail } from "../actions/index";
import { useEffect } from "react";
import styles from '../Detail/Detail.module.css';


export default function Detail(props){
    // console.log(props)
    const dispatch = useDispatch()

    const formatNumber = (num) => {
        let str = num.toString().split(".");
        str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return str.join(".");
      }


    useEffect(()=>{
    dispatch(getDetail(props.match.params.id)) // accedo al id del detalle

    return()=>{// clean de lo que habia----> ONMOUTH --->desmonta componente
        dispatch(cleanDetail([])); // despacha la accion de clean y retorna un array vacio
        } 
        },[dispatch]) // muestra recien cuando el componente se monta

        
const countries = useSelector((state)=> state.detail) // entro y me traigo el detalle
console.log(countries)
return(
<div> 

<Link to= '/home'><button className={styles.button}>⟵ Back</button></Link> <br />
{ Object.keys(countries).length > 0 ? 

//Object.keys: para comprobar si el objeto tiene alguna clave. Si la longitud de las claves es cero, entonces está vacío; de lo 
//contrario, no está vacío.

<div> 
    
            <div className={styles.boxCard}>
                <h3>Country Code: {countries.id} </h3>
                <h3>Name: {countries.name.toUpperCase()}</h3>
                <img className={styles.img} src={countries.imgFlag} alt={countries.name} />
                <h3>Capital: {countries.capital}</h3>
                <h3>Subregion: {countries.subregion}</h3> 
                <h3>Area: {countries.area > 1000000 ? countries.area / 1000000  + ' millions of km²' : countries.area + ' km²'}</h3> 
                <h3>Population: {countries.population > 1000000 ? formatNumber(countries.population /1000000) + ' millions of inhabitants' : formatNumber(countries.population) + " inhabitants" }</h3> 

</div>
</div> : <p>⌛️ Loading....</p>
      
}  
</div>
    )    
    }