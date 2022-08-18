import React from 'react';

import styles from '../Cards/Cards.module.css'
  
    
//exporto por default + destructurimg 
    export default function Cards ({name, imgFlag, continent}) { 
        return (
     
          <div className={styles.card}>
          <h3 className={styles.font}>{name}</h3> 
          <img className={styles.img} src={imgFlag} alt="" /> 
          <h3 className={styles.fontContinent}>Continent: <br /> {continent}</h3>

        </div>  
            
      )
    }

