const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const { GEMINI_API_KEY } = process.env;

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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
