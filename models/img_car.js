const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ImgCar = sequelize.define('ImgCar', {
    img_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    car_id: { type: DataTypes.INTEGER},
    img_name: DataTypes.STRING,
});

module.exports = ImgCar;
