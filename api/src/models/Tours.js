const { DataTypes} = require('sequelize');

module.exports = (sequelize)=>{
    // defino el modelo de actividades turisticas
    sequelize.define('tours',{
        name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        difficulty:{
            type: DataTypes.INTEGER,
            defaultValue:1,
            validate:{min:1,max:5}
        },
        duration:{
            type: DataTypes.STRING,
        },
        season:{
            type: DataTypes.STRING,
        }
    },
    {timestamps: false}
    );
};