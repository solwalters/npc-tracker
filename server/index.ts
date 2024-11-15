const express = require('express');
require('dotenv').config()
const cors = require('cors');
const { Pool } = require('pg');
const PORT = process.env.PORT || 3005;
const app = express();
import {userRoutes} from "./src/routes/user.route";
import {worldRoutes} from "./src/routes/world.route";
import {randomizerRoutes} from "./src/routes/randomizer.route";
const auth = require("./src/auth");
const path = require('path');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.use(cors());
app.use(express.json());

app.use("/user", userRoutes);
app.use("/world", worldRoutes);
app.use("/randomizer", randomizerRoutes);

app.get('/random_race/', async (req, res) => {
  try {
    const query = 'select * from races;';
    const { rows } = await pool.query(query);
    var weightedList : string[] = []
    for (var i = 0; i < rows.length; i++){
      for (var j = 0; j < rows[i].default_population * 10; j++){
        weightedList.push(rows[i].name);
      }
    }
    const randomRace = weightedList[Math.floor(Math.random() * weightedList.length)];
    res.status(200).json({'race': randomRace})

  } catch (err) {
    console.error(err)
    res.status(500).json({'error': err});
  }
});

app.get('/test_people', async (req, res) => {
  try {
    const query = 'select * from test_table;';
    const { rows } = await pool.query(query);
    res.status(200).json(rows);
  } catch (err) {
    console.error(err)
    res.status(500).json({'error': err});
  }
});

app.get('/test_people/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const query = 'select * from test_table where id = $1;';
    const { rows } = await pool.query(query, [id]);

    if (rows.length === 0) {
      return res.status(404).send('person is not in database');
    }

    res.status(200).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({'error': err});
  }
});

// demo endpoints

// free endpoint
app.get("/free-endpoint", (request, response) => {
  response.json({ message: "You are free to access me anytime" });
});

// authentication endpoint
app.get("/auth", auth, (request, response) => {
  response.json({ message: "You are authorized to access me" });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
