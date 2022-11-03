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
            //Como algunos paises no tienen ciertas props, me aseguro con 
            //un condicional para evitar errores posteriores.
            capital: country.capital? country.capital[0]:"None",
            subregion: country.subregion?country.subregion:"None",
            area: country.area,
            population: country.population,
            planeta: "Tierra",
        }
    });
    return apiInfo;
};/********************************************************************/

//FUNCION PARA CREAR SI NO EXISTEN LOS DATOS MAPEADOS EN LA FUNCION ANTERIOR 
//EN MI DATABASE (LA ACCION DE CREATE SE REALIZA SOLO 1 VEZ)
const saveOrCreateCountriesInDb = async function (){
    const data = await getapiInfo();
    data.forEach(country => {
        Country.findOrCreate({
            where: {name:country.name, 
                    id:country.id, 
                    flag_img:country.flag_img,
                    continent:country.continent,
                    capital: country.capital,
                    subregion: country.subregion,
                    area: country.area,
                    population: country.population,
                    planeta: country.planeta,
                }
        })
    })
};/********************************************************************/  

//FUNCION PARA TRAER DE MI DATABASE LAS COUNTRIES CON SUS ACTIVITIES
//LINKEADAS EN EL MISMO MODELO
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

//FUNCION PARA TRAER DE MI DATABASE LAS ACTIVITIES CON SUS COUNTRIES
//LINKEADAS EN EL MISMO MODELO
const getTourswithCountries = async function (){
    const data = await Tours.findAll({
        include:[{ 
            model: Country,
            attributes: ["name"],
            through:{
                attributes:  {exclude: ["createdAt", "updatedAt"]},
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

//FUNCION USADA EN LA RUTA POST DE ACTIVITIES
const addTourtoCountry = async (name,difficulty,duration,season, countries) =>{
    //PRIMERO CREO UNA NUEVA ACTIVIDAD Y LA GUARDO EN "newTour"
    let newTour = await Tours.create({
        name,
        difficulty,
        duration,
        season,
    });
    //BUSCO TODOS LOS PAISES A LOS CUALES SE LE ASIGNARÁ LA ACTIVIDAD
   const countries_tour = await Country.findAll({
        where: {
                name: countries,
          },
    });
    //FINALMENTE LINKEO EL NUEVO TOUR A MI TABLA DE COUNTRIES
    newTour.addCountry(countries_tour);
};/********************************************************************/

const deletetours = async(name) => {
    const tour = await Tours.findOne({ where:{name}});
    await tour.destroy();
};

module.exports = {
    getapiInfo,
    saveOrCreateCountriesInDb,
    getCountrieswithTours,
    findCountriesbyQuery,
    findCountriesbyId,
    addTourtoCountry,
    deletetours,
    getTourswithCountries
}