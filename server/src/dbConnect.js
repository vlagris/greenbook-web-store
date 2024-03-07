import mongoose from "mongoose";

function dbConnect() {
  mongoose.connection.on("connected", () => {
    console.log("DB connected");
  });

  mongoose.connection.on("error", (err) => {
    console.log("DB error : " + err);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("DB disconnected");
  });

  mongoose.connect(process.env.MONGO_CONNECTION_STRING);
}


export default dbConnect;
