import express from "express";
import 'dotenv/config'
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes/index.js";


const app = express();
const corsOptions = {
  credentials: true,
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200
}


app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/static', express.static('public'))
app.use('/api', routes);



app.listen(process.env.PORT, (err) => {
  if (err) {
    return console.log("Server error : " + err);
  }
  console.log("Server OK");
  console.log(`Server listens http://localhost:${process.env.PORT}`);
});