import {sequelize} from "../dbConnect.js";
import {DataTypes} from "sequelize";


const userModel = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.UUIDV4,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });


export default userModel;



