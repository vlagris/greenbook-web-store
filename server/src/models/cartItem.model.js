import {sequelize} from "../dbConnect.js";
import {DataTypes} from "sequelize";


const cartItemsModel = sequelize.define(
  'CartItems',
  {
    id: {
      type: DataTypes.UUIDV4,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.NUMBER,
      defaultValue: 1,
    }
  });


export default cartItemsModel;
