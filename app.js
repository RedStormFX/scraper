const mongoose = require("mongoose");
const routes = require("./routes/routes");
const express = require("express");
require("dotenv").config();

const app = express();
app.use(express.json());

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const mongoString = process.env.DATABASE_URL;
mongoose.set("strictQuery", false);
mongoose.connect(mongoString, mongoOptions);

const database = mongoose.connection;

app.use("/api", routes);

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server is running localhost:${PORT} port`));
