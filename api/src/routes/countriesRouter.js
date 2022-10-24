const { Router } = require("express");
const { findCountriesbyQuery, findCountriesbyId,getCountrieswithTours} = require ("./controllers");

const router = Router();

router.get('/', async (req,res) => {
    //RUTA PARA GET /countries y GET /countries?name="..."
    try{
        const {name} = req.query;
        const countries = await getCountrieswithTours();
        if(!name){//pregunto si no me enviaron name por query
            res.status(201).send(countries);
        }else{//si me envian name por query, matcheo el name con mi DB
            const filtered_countries = findCountriesbyQuery(name,countries);
            res.status(201).send(filtered_countries);
        }
    }catch(error){
        res.status(404).send(error.message);
    }
 });

 router.get('/:id', async (req,res) => {
    //RUTA PARA GET /countries/{idPais}:
    try{
        const {id} = req.params;
        const countries = await getCountrieswithTours();
        const countries_filtered = findCountriesbyId(id,countries);
        res.status(201).send(countries_filtered);
    }catch(error){
        res.status(404).send(error.message);
    }
});

module.exports = router;
