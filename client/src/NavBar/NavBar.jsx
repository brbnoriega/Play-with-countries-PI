import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import { getCountries} from '../actions/index.js';

import styles from '../NavBar/NavBar.module.css';
import SearchBar from "../SearchBar/SeachBar";


export default function Navbar() {
  const dispatch = useDispatch()
  

  //---reload---
  function handleReload(e){
    e.preventDefault(); // para que no se recargue la pag
    dispatch(getCountries());

}

  return (
 <div className={styles.navbar}>
   <Link to = '/countries'> <button className={styles.reload} onClick= {e=> {handleReload(e)}}> reload </button> </Link>

  <SearchBar/>


</div>



)
}