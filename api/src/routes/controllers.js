//Requiero lo que voy a necesitar para mis controllers
const axios = require ("axios");
const {Country, Tours} = require ("../db");

//Defino mis funciones controllers

//FUNCION PARA MAPEAR Y GUARDAR LOS DATOS NECESARIOS DE LA API 
const getapiInfo = async function (){
    //En primera instancia consulto a la API con el endpoint brindado
    const apiUrl = await axios.get("https://restcountries.com/v3/all");
    //Guardo los datos que voy a necesitar en la constante "apiInfo"
    const apiInfo = await apiUrl.data.map(country=>{
        return {
            name: country.name.common,
            id: country.cca3,
            flag_img: country.flags[1],
            continent: country.continents[0],
            //Como algunos paises no tienen capital, me aseguro con 
            //un condicional para evitar errores posteriores.
            capital: country.capital? country.capital[0] :"None",
            subregion: country.subregion,
            area: country.area,
            population: country.population,
        }
    });
    return apiInfo;
};/********************************************************************/


//FUNCION PARA GUARDAR LOS DATOS MAPEADOS EN LA FUNCION ANTERIOR 
//EN MI DATABASE
const saveCountriesInDb = async function (){
    const data = await getapiInfo();
    //Uso bulkCreate porque me permite guardar gran cantidad de datos 
    //pasandole un array;
    const db_countries = await Country.bulkCreate(data);
    return db_countries;
};/********************************************************************/


//FUNCION PARA TRAER DE MI DATABASE LAS COUNTRIES CON SUS ACTIVITIES
const getCountrieswithTours = async function (){
    const data = await Country.findAll({
        include:[{//incluyo el modelo tours para recibir la actividad
            //como propiedad en cada pais con sus respectivos datos
            model: Tours,
            attributes: ["name","difficulty","duration","season"],
            through:{
                    attributes: {exclude: ["createdAt", "updatedAt"]},
                    }
            }],
        });
    return data;
};/********************************************************************/

//FUNCION PARA MATCHEAR EL STRING QUE SE INGRESA POR QUERY CON LOS NOMBRES
//DE PAISES QUE COINCIDAN CON ESE STRING EN MI ARRAY DE PAISES
const findCountriesbyQuery = (queryInfo, countries) => {
    let aux = [];
    let long = queryInfo.length;
    for (let country of countries){
        if(country["name"].substring(0,long).toLowerCase() === queryInfo.toLowerCase()) aux.push(country);
    }
    if(aux.length === 0) throw new Error("No se encontró ningún país")
    return aux;
};/********************************************************************/

//FUNCION PARA MATCHEAR EL STRING QUE SE INGRESA POR PARAMS 
//CON ALGUN PAIS CON ID SIMILAR EN MI ARRAY DE PAISES
const findCountriesbyId = (id, countries) => {
    const filteredCountry = countries.find(country => 
        country.id.toLowerCase() === id.toLowerCase());
    if(!filteredCountry) throw new Error("No se encontró ningún país con el id ingresado");
    return filteredCountry;
};/********************************************************************/

const addTourtoCountry = async (name,difficulty,duration,season, countries) =>{
    let newTour = await Tours.create({
        name,
        difficulty,
        duration,
        season,
    });
   const countries_tour = await Country.findAll({
        where: {
                name: countries,
          },
    });    
    newTour.addCountry(countries_tour);
}

const evaluate_existingtours = async() => {
    const countriesFromBody = await Country.findAll({
        where: {
          name: countries_name,
        },
        include:[
            {
              model: Tours,
              attributes: ["name","difficulty","duration","season"],
            },
          ],});
        /* console.log(countriesFromBody[0].dataValues.name);
        console.log(countriesFromBody.hasOwnProperty("tours")); */
    if(countriesFromBody[0].dataValues.hasOwnProperty("tours")){
        let existTourInCountry = countriesFromBody[0].dataValues.tours.find(tour => {
                if(tour.name.toLowerCase() === name.toLowerCase()) return true;
            throw new Error("This activity already exists")
        });
        console.log(existTourInCountry);
        if (!existTourInCountry){
            let newTour = await Tours.create({
                name,
                difficulty,
                duration,
                season,
            });
           const countries_tour = await Country.findAll({
                where: {
                        name: countries_name,
                  },
            });    
            newTour.addCountry(countries_tour);
        }
    }else{
        let newTour = await Tours.create({
            name,
            difficulty,
            duration,
            season,
        });
       const countries_tour = await Country.findAll({
            where: {
                    name: countries_name,
              },
        });    
        newTour.addCountry(countries_tour);
    };
};

module.exports = {
    getapiInfo,
    saveCountriesInDb,
    getCountrieswithTours,
    findCountriesbyQuery,
    findCountriesbyId,
    addTourtoCountry,
    evaluate_existingtours,
}