require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectMongoDb } = require("./config/mongoDb");

const userRoute = require("./routes/userRoute");
const flightRoute = require("./routes/flightRoute");
// const passengerRoute = require("./routes/passengerRoute");
// const authenticate = require("./middlewares/userAuthentication");

const app = express();
const PORT = process.env.PORT || 3000;
connectMongoDb(process.env.MONGO_URL);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/v1", userRoute);
app.use("/api/v1", flightRoute);
// app.use("/api/v1", passengerRoute);

app.get("/", (req, res) => {
  console.log(req.body);
  res.send("Jai Shree ram");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
