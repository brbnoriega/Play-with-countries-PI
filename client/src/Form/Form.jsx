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
        <form  onSubmit={(e)=> handleSubmit(e)}>
                
        <div className={styles.formStyle}>
        <label className={styles.fontBoxtitles}>Activity name </label><br />
        <input className={styles.fontBox} name="name" type="text" placeholder="Please write a name..." onChange={(e)=>handleChange(e)}/> 
        {error.name && (
             <label className={styles.fontBox}> {error.name}</label>
          )}
        <br />  <br />
        
      {/*onChange evento de cambio --> trae info del input */}
        {/* ----------- */}
        <label className={styles.fontBoxtitles}>Duration </label><br />
        <input className={styles.fontBox} name="duration" type="number" placeholder="Hours..." min={1} max={24}  onChange={(e)=>handleChange(e)}/><br /><br />
        {/* ----------- */}
        <label className={styles.fontBoxtitles}>Difficulty </label><br />
        <select className={styles.fontBox} name="difficulty" onChange={(e)=>handleChange(e)}> <br/>
        <option hidden value="">Select a difficulty</option>
        <option className={styles.fontBox} value="1">Too Easy</option>
        <option className={styles.fontBox} value="2">Easy</option>
        <option className={styles.fontBox} value="3">Medium</option>
        <option className={styles.fontBox} value="4">Hard </option>
        <option className={styles.fontBox} value="5">Very Hard</option>
        </select><br /><br />
        {/* ----------- */}
        <label className={styles.fontBoxtitles}>Season </label><br />
        <select className={styles.fontBox} name='season' type='text' onChange={(e)=>handleChange(e)}>  {/*onChange ---handleSeason  */}
        <option className={styles.fontBox} hidden value=""> Select a season </option>
        <option className={styles.fontBox} value="Summer">Summer</option>
        <option className={styles.fontBox} value="Autumn">Autumn</option>
        <option className={styles.fontBox} value="Winter">Winter</option>
        <option className={styles.fontBox} value="Spring">Spring</option>
        </select><br /><br />
        {/* ----------- */}
        <label className={styles.fontBoxtitles}>Countries: </label><br />
        <select className={styles.fontBox} name="countries" onChange={(e)=> handleSelect(e)}> 
        <option hidden value="">Activity place...</option>
        {
        allCountries.map(e => {
        return(
        <option className={styles.fontBox} value={e.name} key={e.id}>{e.name}</option>
        )
        })
        }
        </select>         <br />
         
        {activities.countries.map(countriesMap=> {return (
        <>
        <button type="button" value={countriesMap} className={styles.buttonAct} onClick={(e)=> handleClean(e)}>x</button> <label> {countriesMap}</label><br />
         </>
        )})}  <br/>
        


        </div>
        <button type="submit" className={styles.createButton}>Create Activity</button> <br />

        </form>
        </div>          
        </div>   
        )
        }