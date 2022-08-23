import React from "react";
import styles from './Paginado.module.css'


export default function Paginado ({pag, setCurrentPage, max}){
  
    const nextPage = () => {
        if (pag !== max ) return setCurrentPage(pag + 1);
    }; 

    const prevPage = ()=>{
     if(pag !== 1)  return setCurrentPage(pag - 1);
    }
    return(

            <div className={styles.button}>
                <button className={styles.arrow} onClick={prevPage}>&#8249;</button>
                <span className={styles.pag}> {pag}  de {max}</span>
                <button className={styles.arrow} onClick={nextPage}>&#8250;</button>
            </div>
    )
}
