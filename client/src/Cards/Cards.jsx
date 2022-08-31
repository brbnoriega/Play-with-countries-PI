import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../Cards/Cards.module.css'
  
    
//exporto por default + destructurimg 
    export default function Cards ({name, imgFlag, continent, id}) { 
        return (
     <Link to= {'/countries/'+ id} >
          <div className={styles.card}>
          <h3 className={styles.font}>{name}</h3> 


          {/* <img className={styles.img} src={imgFlag} alt="" />  */}

          
          <img className={styles.img}  src={imgFlag} alt="" /> 
  
          <h3 className={styles.fontContinent}>Continent: <br /> {continent}</h3>

        </div>  
            </Link>
      )
    }

