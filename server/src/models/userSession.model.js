import {sequelize} from "../dbConnect.js";
import {DataTypes} from "sequelize";


const userSessionModel = sequelize.define(
  'UserSession',
  {
    id: {
      type: DataTypes.UUIDV4,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });


export default userSessionModel;
