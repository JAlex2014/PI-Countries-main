const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    name: {
      type: DataTypes.STRING,//nombre*
      allowNull: false,
    },
    id:{
      type: DataTypes.STRING(3),//codigo de 3 letras *
      allowNull: false,
      primaryKey: true,
    },
    flag_img:{
      type: DataTypes.STRING,//imagen de la bandera*
      allowNull: false,
    },
    continent:{
      type: DataTypes.STRING,//continente*
      allowNull: false,
    },
    capital:{
      type: DataTypes.STRING,//capital*
      allowNull: false,
    },
    subregion:{
      type: DataTypes.STRING,//subregión
      allowNull: true,
    },
    area:{
      type: DataTypes.DECIMAL,//area
      allowNull: true,
    },
    population: {
      type: DataTypes.INTEGER,//población
      allowNull: true,
    },
    planeta:{
      type: DataTypes.STRING,//planeta
      
    }
  },{timestamps: false}
  );
};
