const express = require("express");
const morgan = require("morgan");
const cron = require("node-cron");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const { datesRouter } = require("./routes/covid.routes");
const { conexion } = require("./db/conexion");
const { covidServiceTime } = require("./services/covid.service");

const app = express();

cron.schedule("*/10 * * * *", async () => {
  console.log("running a task every 10 minuts");
  await covidServiceTime();
});

app.use(morgan("dev"));

app.use("/api/v1/covid-dates", datesRouter);

conexion
  .authenticate()
  .then(() => console.log("Database authenticated"))
  .catch((err) => console.log(err));

conexion
  .sync({ force: false })
  .then(() => console.log("Database synced"))
  .catch((err) => console.log(err));

const PORT = 4001;
app.listen(PORT, () => {
  console.log(`Express app running on port: ${PORT}`);
});
