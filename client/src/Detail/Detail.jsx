import React from "react";
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { getDetail, cleanDetail } from "../actions/index";
import { useEffect } from "react";
import styles from '../Detail/Detail.module.css';
//const {id} =useParams()

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

        //[dispatch, id]
const countries = useSelector((state)=> state.detail) // entro y me traigo el detalle
console.log(countries)
return(
<div className={styles.background}> 

<Link to= '/home'><button className={styles.backbutton}>⟵</button></Link> <br />
{ Object.keys(countries).length > 0 ? 

//Object.keys: para comprobar si el objeto tiene alguna clave. Si la longitud de las claves es cero, entonces está vacío; de lo 
//contrario, no está vacío.


        <div className={styles.boxCard}>
                <h3 className={styles.title}>Country Code: {countries.id}</h3> {/* key={id} */}
                <img className={styles.img} src={countries.imgFlag} alt={countries.name} />
                 <h3 className={styles.title}>{countries.name.toUpperCase()}</h3>
                <h3  className={styles.font}>Capital: {countries.capital}</h3>
                <h3 className={styles.font}>Subregion: {countries.subregion}</h3> 
                <h3 className={styles.font}>Area: {countries.area > 1000000 ? countries.area / 1000000  + ' millions of km²' : countries.area + ' km²'}</h3> 
                <h3 className={styles.font}>Population: {countries.population > 1000000 ? formatNumber(countries.population /1000000) + ' millions of inhabitants' : formatNumber(countries.population) + " inhabitants" }</h3> 
               

<div className={styles.cardAct}>


{                   countries.activities.length > 0 ? countries.activities.map(actmap=>(<div className={styles.boxTwo}> <h3 className={styles.font}>Activities:</h3>
    <ul>
        <li>Name: {actmap.name}</li>
        <li>Duration: {actmap.duration} hs</li>
        <li>Season: {actmap.season}</li>
        <li>Difficulty: {actmap.difficulty} {actmap.difficulty === '1' ? 'Too Easy' : actmap.difficulty === '2' ? 'Easy' : actmap.difficulty === '3' ? 'Medium' : actmap.difficulty === '4' ? 'Hard' : 'Very Hard'    }</li>
    </ul>
 </div>  

    
     )
                   
                   ): <h4 className={styles.font}> Without tourist activity</h4> } </div>

                     
</div>
 : <p>⌛️ Loading....</p>
      
}  
</div>
    )    
    }