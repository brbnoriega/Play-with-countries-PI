const axios = require('axios');
const { Router } = require("express");
const {Country, Activity} = require ('../db'); 
const { Op } = require('sequelize');
const countriesRoutes = Router();



//-------DB----------------------------------------------------------------------------
    const restDb = async()=>{
    const table = await Country.count();

    if(!table){
    const getrest = await axios.get(`https://restcountries.com/v3/all`);
    const restInfo = await Promise.all(getrest.data.map(async(restMap)=>{
        return{
            id: restMap.cca3,
            name: restMap.name.common,
            imgFlag: restMap.flags[2],
            continent: restMap.continents[0],
            capital: restMap.capital ? restMap.capital[0] : "Without Capital",
            subregion: restMap.subregion,
            area: restMap.area,
            population: restMap.population
           
        } }))
    
        const tableFromDb = await Country.findAll()
        
        if(tableFromDb.length === 0){

            await Country.bulkCreate(restInfo);
            console.log(Country)
            return Country
       
} 
}
    }
// ------------------------[ ] GET /countries:
// En una primera instancia deberán traer todos los países desde restcountries y guardarlos en su propia base de datos y luego ya utilizarlos desde allí (Debe retonar sólo los datos 
//necesarios para la ruta principal)
// Obtener un listado de los paises.
countriesRoutes.get('/countries', async(req,res)=>{

    restDb()
    const contrydb = await Country.findAll()


// [ ] GET /countries?name="...":
// Obtener los países que coincidan con el nombre pasado como query parameter (No necesariamente tiene que ser una matcheo exacto)
// Si no existe ningún país mostrar un mensaje adecuado
    if(req.query.name) {
        const name = req.query.name
        console.log(name)
            try {
                let countryFind = await Country.findAll({
                    where: {name: { [Op.iLike]: '%'+name+'%'}
                        
                    // include: { model: Activity}    
                    }
                }
                )
                res.send(countryFind)
            } catch(error){
                res.send('Country Not found! ')
            }
    }else{
            res.send(contrydb)
    }

})



// ------------------------[ ] GET /countries/{idPais}:
// Obtener el detalle de un país en particular
// Debe traer solo los datos pedidos en la ruta de detalle de país
// Incluir los datos de las actividades turísticas correspondientes

countriesRoutes.get('/countries/:id', async(req,res)=>{

    const {id} = req.params;

        try{
            const countryId = await Country.findByPk(id.toUpperCase(), {include: Activity}); // include: Activity
            res.status(200).send(countryId);

        }catch(error){
            res.status(404).send('Error: country not found')
        }

})



module.exports = countriesRoutes;
