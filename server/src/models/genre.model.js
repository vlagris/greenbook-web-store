import {sequelize} from "../dbConnect.js";
import {DataTypes} from "sequelize";


const genreModel = sequelize.define(
  'Genre',
  {
    id: {
      type: DataTypes.UUIDV4,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pathName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });


export default genreModel;
