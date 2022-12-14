const axios = require('axios');
const { Router } = require("express");
const {Activity, Country} = require('../db');
const activityRouter = Router();


// [ ] POST /activities:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de actividad turística por body
// Crea una actividad turística en la base de datos, relacionada con los países correspondientes

activityRouter.post('/', async(req, res)=>{

const {name, difficulty, duration, season, countries} = req.body;


if( !name || !difficulty || !duration || !season || !countries) return res.status(404).send('Error, try again!');

try{
    const postAct = await Activity.create({

        // id: id,
        name: name,
        difficulty: difficulty,
        duration: duration,
        season: season,
    })

    let actAndCountry = await Country.findAll({
        where:{ name: countries}
    });

    postAct.addCountry(actAndCountry)
    res.status(201).send('We have our Activity:)');

    // res.json(postAct);
}catch(error) {
    res.status(404).send('Not created :(')
}
});

activityRouter.get('/activities', async(req, res)=>{
const act = await Activity.findAll()
try{

   res.send(act)

} catch(error){
    console.log(error)
}



});



//probando ruta delete:
activityRouter.delete('/activities/:name', async(req, res)=>{
   const {name} = req.params
    try{
    
        if(name){
            Activity.destroy({where: {name: name}})
        }
       res.send('We delete that activity')
    
    } catch(error){
        console.log('Deleted')
    }
    
    });




//probando ruta put:
activityRouter.put('/activities/:id', async(req, res)=>{
    const {id} = req.params;
    const act = req.body;
     try{
     
         if(id){
            const bkUpdate = await Activity.update(act,{where: {id: id }})
             
         }
        // res.json({change: true})
        res.send('Changed relese')
     
     } catch(error){
         console.log('changed fail')
     }
     
     });


module.exports = activityRouter;