import 'dotenv/config'
import {Sequelize} from "sequelize";

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: `${process.env.SQLITE_STORAGE_PATH + process.env.SQLITE_STORAGE_NAME}`
});

try {
  await sequelize.authenticate()
  console.log('Соединение с БД было успешно установлено')
} catch (e) {
  console.log('Невозможно выполнить подключение к БД: ', e)
}
