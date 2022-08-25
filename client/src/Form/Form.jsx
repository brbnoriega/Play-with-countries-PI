import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link} from 'react-router-dom';
import styles from '../Form/Form.module.css';
import { getCountries, postAct } from '../actions';


export default function ActivitiesCreate(){
    const dispatch = useDispatch()  
    
    useEffect(()=>{  
                dispatch(getCountries())
            },[dispatch]) 

        const allCountries = useSelector((state)=> state.countries)
        allCountries.sort(function(a,b){
                if(a.name > b.name){
                    return 1;
                }
                if(b.name> a.name){
                    return -1;
                }
                return 0;
            })

        //const[errButton, setErrButton] = useState(); //Object.keys(errors).length <1 ? false : true

            //estado local donde voy a manejar el objeto 
            // objeto--->se envia al servidor
        const [activities, setAct] = useState({ // le paso a este nuevo objeto lo  que necesita el post
            
        name: "",
        difficulty: "",
        duration: "",
        season: "",// para que guarde mas que 1 opcion 
        countries: []
        })

        //---estados locales que necesitemos: 
        const [error, setErr] = useState(true) // cuando este en true se desabilite
       

        //validation name
        function validate(activities){
        let keep = {};
                let regexName = new RegExp('^[a-zA-Z ]{2,30}$'); 
                //----name validate---
                if  (activities.name.length>0 && !regexName.test(activities.name)) { // SI NADIE ESCRIBIO NADA EN EL IMPUT 
                        keep.name = 'Pardon, that is not a name!'
                       
        }
        return keep
        }
        //---manejo de cambios
        function handleChange(e){ 

        setErr(validate({ //validate name
        ...activities,
        [e.target.name]: e.target.value
        }));

        setAct({ 
        ...activities,
        [e.target.name]: e.target.value
        })     
        }
        
        //---manejo de entrega
        function handleSubmit(e){
                e.preventDefault()
                if(activities.name === '' || activities.duration === '' || activities.difficulty === '' || activities.season ===  '' || 
                activities.countries.length === 0){
                        alert('You have to field the form!')
                }else{
                e.preventDefault();
                dispatch(postAct(activities))
                 alert("Your activities is Create it!")
                setAct({
                        name: "",
                        difficulty: "",
                        duration: "",
                        season: "",// para que guarde mas que 1 opcion 
                        countries: []
                } ) 
                e.target.reset();
        }
}
        function handleSelect(e){
                setAct({
                  ...activities,
                 countries: [...new Set([...activities.countries, e.target.value])], // me traigo las act ya cargadas
                })
                e.target.value = ""
              }

        function handleClean(e){
                setAct({
                ...activities,
                countries: activities.countries.filter((countryfilter)=>countryfilter !== e.target.value), // //muestro todas menos la que indico en el filtro 
                })
              }
       


        return(
        <div className={styles.background}>
                <Link to= '/home'><button className={styles.backbutton}>⟵</button></Link> 
                <h1 className={styles.title}>Be a Creator</h1>
                <h4 className={styles.subtitle}>Your own Activity Turist</h4>
        <div className={styles.boxForm}>  
        <form onSubmit={(e)=> handleSubmit(e)}>
                
        <div>
        <label>Activity name </label>
        <input name="name" type="text" placeholder="Please write a name..." onChange={(e)=>handleChange(e)}/> 
        {error.name && (
             <label > {error.name}</label>
          )}
        <br />  
        
      {/*onChange evento de cambio --> trae info del input */}
        {/* ----------- */}
        <label>Duration </label>
        <input name="duration" type="number" placeholder="Hours..." min={1} max={24}  onChange={(e)=>handleChange(e)}/><br />
        {/* ----------- */}
        <label>Difficulty </label>
        <select name="difficulty" onChange={(e)=>handleChange(e)}> <br/>
        <option hidden value="">Select the difficulty</option>
        <option value="1">Too Easy</option>
        <option value="2">Easy</option>
        <option value="3">Medium</option>
        <option value="4">Hard </option>
        <option value="5">Very Hard</option>
        </select><br />
        {/* ----------- */}
        <label>Season </label>
        <select  name='season' type='text' onChange={(e)=>handleChange(e)}>  {/*onChange ---handleSeason  */}
        <option hidden value=""> Select the season </option>
        <option value="Summer">Summer</option>
        <option value="Autumn">Autumn</option>
        <option value="Winter">Winter</option>
        <option value="Spring">Spring</option>
        </select><br />
        {/* ----------- */}
        <label>Countries: </label>
        <select name="countries" onChange={(e)=> handleSelect(e)}>
        <option hidden value="">Countries to practice this activity...</option>
        {
        allCountries.map(e => {
        return(
        <option value={e.name} key={e.id}>{e.name}</option>
        )
        })
        }
        </select> <br />              
        {activities.countries.map(countriesMap=> {return (
        <>
        <button type="button" value={countriesMap} onClick={(e)=> handleClean(e)}>x</button> <label> {countriesMap}</label><br />
         </>
        )})}  <br/><br />
        </div>
        <button type="submit">Create Activity</button>

        </form>
        </div>          
        </div>   
        )
        }