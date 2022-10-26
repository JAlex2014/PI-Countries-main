const { Router } = require("express");
const {addTourtoCountry,getTourswithCountries,deletetours} = require("./controllers");
const {Country, Tours}=require("../db")

const router = Router();
router.get('/', async (req,res) => {
    try{
        const activities = await getTourswithCountries();
        res.status(201).send(activities);
    }catch(error){
        res.status(404).send(error.message);
    }
});
    
router.post('/', async (req,res) => {
    try{
        const {name,difficulty,duration,season, countries} = req.body;
        if(!name || !difficulty || !duration || !season || !countries){
        res.status(404).json("No se enviaron los datos necesarios");   
        }else{
            await addTourtoCountry(name,difficulty,duration,season, countries);
            res.status(201).send("Se agregó la actividad correctamente");
        }
    }catch(error){
        res.status(404).send(error.message);   
    }
});

router.delete('/', async (req,res) => {
    try{
        const {name} = req.body;
        await deletetours(name);
        res.status(201).send("La actividad fue eliminada correctamente");
    }catch(error){
        res.status(404).send("La actividad no pudo ser eliminada"); 
    }
});

router.put('/:id', async (req,res)=>{
    try{
        const {id} = req.params;
        const {name,difficulty,duration,season,countries} = req.body;
        const tour_updated = await Tours.findOne({ where:{id}});
        tour_updated.set({
            name,difficulty,duration,season
        });
        await tour_updated.save();
        const countries_tour = await Country.findAll({
            where: {
                    name: countries,
              },
        });
        tour_updated.addCountry(countries_tour);
        res.status(201).send("La actividad fue actualizada correctamente");
    }catch(error){
        res.status(404).send("La actividad no pudo ser actualizada");
    }
})

module.exports = router;