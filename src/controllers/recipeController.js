//require("dotenv").config();
//const axios = require("axios");
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
//const { HfInference } = require("@huggingface/inference");
import { AutoTokenizer, AutoModelForCausalLM } from "@xenova/transformers";

const tokenizer = AutoTokenizer.from_pretrained("yam-peleg/Hebrew-Mistral-7B");
const model = AutoModelForCausalLM.from_pretrained(
  "yam-peleg/Hebrew-Mistral-7B"
);

const { HF_API_URL, HF_API_TOKEN } = process.env;

//const client = new HfInference(HF_API_TOKEN);

const generateRecipe = async (req, res) => {
  try {
    const input = "מה זה יקום?";
    const inputs = tokenizer.encode(input, { return_tensors: "pt" });
    const response = await model.generate(inputs.input_ids);
    const decodedResponse = tokenizer.decode(response[0], {
      skip_special_tokens: true,
    });

    console.log(decodedResponse);
    res.json({ reply: decodedResponse });

    /*const { message } = req.body;

    const inputIds = tokenizer.encode(message, { return_tensors: "pt" });
    const outputs = model.generate(inputIds);
    const reply = tokenizer.decode(outputs[0], { skip_special_tokens: true });
    res.json({ reply: reply });
*/
    /* const response = await axios.post(
      HF_API_URL,
      { inputs: message },
      {
        headers: {
          Authorization: `Bearer ${HF_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    const result = response.data.choices[0].generated_text;
    console.log(result);

    res.status(200).json({ reply: result });
    */
  } catch (error) {
    console.error(
      "Error: ",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

/*
const { OPENAI_API_KEY, OPENAI_URL } = process.env;

const generateRecipe = async (req, res) => {
  const { prompt } = req.body;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${OPENAI_API_KEY}`,
  };

  const body = {
    model: "gpt-4o-mini-2024-07-18",
    messages: [
      {
        role: "developer",
        content: "You are a helpful recipe chatbot that converses in Hebrew",
      },
      { role: "user", content: prompt },
    ],
  };

  try {
    const response = await axios.post(OPENAI_URL, body, { headers });
    const result = response.data.choices[0].message.content;
    console.log(result);

    res.status(200).json(response.data.choices[0].message.content);
  } catch (error) {
    console.error(
      "Error calling ChatGPT API:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
*/

module.exports = {
  generateRecipe,
};
