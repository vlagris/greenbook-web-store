import express from "express";
import 'dotenv/config'
import cors from "cors";
import cookieParser from "cookie-parser";
import dbConnect from "./dbConnect.js";
import routes from "./routes/index.js";
// import {addBooksToDB, addDataToDB} from "./data.js";


const app = express();
const corsOptions = {
  credentials: true,
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200
}



dbConnect();
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());


app.use('/api', routes);

// addBooksToDB();


app.listen(process.env.PORT, (err) => {
  if (err) {
    return console.log("Server error : " + err);
  }
  console.log("Server OK");
  console.log(`Server listens http://localhost:${process.env.PORT}`);
});