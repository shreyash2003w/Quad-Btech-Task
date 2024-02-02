require("dotenv").config();
const express = require("express");

const mongoose = require("mongoose");
const axios = require("axios");

const app = express();

var cors = require("cors");
app.use(cors());
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.DB_STRING);

const cryptoSchema = new mongoose.Schema({
  name: String,
  base_unit: String,
  low: Number,
  high: Number,
  last: Number,
  buy: Number,
  sell: Number,
  volume: Number,
  open: Number,
  at: String,
  base_unit: String,
});

const Crypto = mongoose.model("Crypto", cryptoSchema);

async function fetchAndStoreData() {
  try {
    const response = await axios.get("https://api.wazirx.com/api/v2/tickers");
    const top10Results = Object.values(response.data).slice(0, 10);

    await Crypto.deleteMany({});
    await Crypto.insertMany(top10Results);
  } catch (error) {
    console.error("Error fetching and storing data:", error);
  }
}

app.get("/api/data", async (req, res) => {
  try {
    const data = await Crypto.find({}, "-_id -__v").lean();
    res.json(data);
  } catch (error) {
    console.error("Error fetching data from the database:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);

  // Fetch and store data every minute
  setInterval(() => {
    fetchAndStoreData();
  }, 60000); // Fetch data every 1 minute
});
