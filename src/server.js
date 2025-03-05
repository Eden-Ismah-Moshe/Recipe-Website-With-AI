const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();
const { Pool } = require("pg");

const { GEMINI_API_KEY, PG_USER, PG_PASSWORD, PG_HOST, PG_PORT, PG_DB_NAME } =
  process.env;

const pool = new Pool({
  user: PG_USER,
  password: PG_PASSWORD,
  host: PG_HOST,
  port: PG_PORT,
  database: PG_DB_NAME,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};

const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post("/generate-recipe", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await axios.post(
      GEMINI_API_URL,
      {
        contents: [
          {
            parts: [{ text: message }],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = response.data.candidates[0].content.parts[0].text;
    res.status(200).json({ reply: result });
  } catch (error) {
    console.error(
      "Error: ",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
});

app.get("/recipe/:id", async (req, res) => {
  const { id } = req.params;
  console.log("ID: ", id);
  try {
    pool.query(
      "SELECT * FROM recipes WHERE name = $1",
      [id],
      (error, results) => {
        if (error) {
          throw error;
        }
        res.status(200).json(results.rows[0]);
      }
    );
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
