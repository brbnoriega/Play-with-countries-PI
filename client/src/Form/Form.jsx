import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../Form/Form.module.css';


// Ruta de creación de actividad turística: debe contener
// [ ] Un formulario controlado con JavaScript con los siguientes campos:
// Nombre
// Dificultad
// Duración
// Temporada
// [ ] Posibilidad de seleccionar/agregar varios países en simultáneo
// [ ] Botón/Opción para crear una nueva actividad turística
// Es requisito que el formulario de creación esté validado con JavaScript y no sólo con validaciones HTML. Pueden agregar las validaciones que consideren. Por ejemplo: Que el nombre de la actividad no pueda contener símbolos, que la duración no pueda exceder determinado valor, etc.


export default function ActivitiesCreate(){
    const dispatch = useDispatch()
    const activity = useSelector(state=>state.activity)

            //const[errButton, setErrButton] = useState(); //Object.keys(errors).length <1 ? false : true

            //estado local donde voy a manejar el objeto 
            // objeto--->se envia al servidor
        const [activities, setAct] = useState({ // le paso a este nuevo objeto lo  que necesita el post
            
        name: "",
        difficulty: "",
        duration: "",
        season: [],// para que guarde mas que 1 opcion 
        })

        //---estados locales que necesitemos: 
        const [errButton, setErrButton] = useState(true) // cuando este en true se desabilite

        //---manejo de cambios
        function handleChange(){ //validacion

        }
        //---manejo de entrega
        function handleSubmit(){

        }


        return(
        <div className={styles.background}>
                <h1 className={styles.title}>Be a Creator</h1>
                <h4 className={styles.subtitle}>Your own Activity Turist</h4>

        <div className={styles.boxForm}>  
        <form onSubmit={handleSubmit}>
                        <div>
                                <label>Name </label>
                                <input name="name" type="text" placeholder="Please write a name..." value={activities.name} onChange={handleChange}/><br />  {/*onChange evento de cambio --> trae info del input */}
                                {/* ----------- */}
                                <label>Duration </label>
                                <input name="duration" type="text" placeholder="Hours of the Activity..." onChange={handleChange}/><br />
                                {/* ----------- */}
                                <label>Difficulty </label>
                                <select  value="" name="difficulty" onChange={(e)=>handleChange(e)}> <br/>
                                <option hidden value="">Difficulty of the activity...</option>
                                <option value="1">Too Easy</option>
                                <option value="2">Easy</option>
                                <option value="3">Medium</option>
                                <option value="4">Difficult </option>
                                <option value="5">Very Difficult</option>
                                </select><br />
                                {/* ----------- */}
                                <label>Seasons </label>
                               <select>  {/*onChange ---handleSeason  */}
                               <option hidden value=""> Seasons </option>
                                <option value="Summer">Summer</option>
                                 <option value="Autumn">Autumn</option>
                                <option value="Winter">Winter</option>
                                <option value="Spring">Spring</option>
                                </select>
                                {/* ----------- */}
                        
                        </div>
                        <button type="submit">Create Activity</button>
        </form>
        </div>            
        </div>
               
                )
                }