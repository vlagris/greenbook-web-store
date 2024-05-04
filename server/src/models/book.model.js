import {sequelize} from "../dbConnect.js";
import {DataTypes} from "sequelize";


const bookModel = sequelize.define(
  'Book',
  {
    id: {
      type: DataTypes.UUIDV4,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    discount: {
      type: DataTypes.NUMBER,
      defaultValue: 0,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating_rate: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    rating_count: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
  });


export default bookModel;
