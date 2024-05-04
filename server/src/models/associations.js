import {sequelize} from "../dbConnect.js";
import genreModel from "./genre.model.js";
import authorModel from "./author.model.js";
import bookModel from "./book.model.js";
import cartModel from "./cart.model.js";
import cartItemsModel from "./cartItem.model.js";
import userModel from "./user.model.js";
import userSessionModel from "./userSession.model.js";


bookModel.belongsToMany(genreModel, {
  through: "BookGenres",
  foreignKey: 'bookId',
  otherKey: 'genreId'
});
genreModel.belongsToMany(bookModel, {
  through: "BookGenres",
  foreignKey: 'genreId',
  otherKey: 'bookId'
});


bookModel.belongsToMany(authorModel, {
  through: "BookAuthors",
  foreignKey: 'bookId',
  otherKey: 'authorId'
});
authorModel.belongsToMany(bookModel, {
  through: "BookAuthors",
  foreignKey: 'authorId',
  otherKey: 'bookId'
});


userModel.hasMany(cartModel, {
  foreignKey: 'userId'
});
cartModel.belongsTo(userModel, {
  foreignKey: 'userId'
});


bookModel.belongsToMany(cartModel, {
  through: cartItemsModel,
  foreignKey: 'bookId',
  otherKey: 'cartId'
});
cartModel.belongsToMany(bookModel, {
  through: cartItemsModel ,
  foreignKey: 'cartId',
  otherKey: 'bookId'
});


userModel.hasMany(userSessionModel, {
  foreignKey: 'userId'
});
userSessionModel.belongsTo(userModel, {
  foreignKey: 'userId'
});


await sequelize.sync();
