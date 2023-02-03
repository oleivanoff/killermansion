const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const response = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: "Winnie the Pooh has the color Yellow and a red shirt\nGenerate one multiple choice question with four options and return it in json format with the correct marked\n\nQ: What color is Winnie the Pooh's shirt? \nA: \n{\n    \"Question\": \"What color is Winnie the Pooh's shirt?\",\n    \"Options\": [\n        \"Yellow\",\n        \"Red\",\n        \"Green\",\n        \"Blue\"\n    ],\n    \"CorrectAnswer\": \"Red\"\n}",
  temperature: 0.7,
  max_tokens: 256,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
});