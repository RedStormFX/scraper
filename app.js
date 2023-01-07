const mongoose = require("mongoose");
const routes = require("./routes/routes");
const express = require("express");
require("dotenv").config();

const Authorization = require("./services/google_auth");

const app = express();
app.use(express.json());

const mongoString = process.env.DATABASE_URL;
mongoose.set("strictQuery", false);
mongoose.connect(mongoString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const database = mongoose.connection;

app.use("/api", routes);

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server is running on ${PORT} port`));
