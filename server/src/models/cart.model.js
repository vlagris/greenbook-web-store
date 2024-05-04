import {sequelize} from "../dbConnect.js";
import {DataTypes} from "sequelize";


const cartModel = sequelize.define(
  'Cart',
  {
    id: {
      type: DataTypes.UUIDV4,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },
  });


export default cartModel;
