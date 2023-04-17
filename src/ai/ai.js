exports.run = async(message) => {
    const { Configuration, OpenAIApi } = require("openai");
    require('dotenv').config();

    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    //Make bbot respond to the prompt
    const prompt = message.content;

    const response =  await openai.createCompletion({
        model: "text-davinci-002",
        prompt: prompt,
        max_tokens: 256,
        temperature: 0.1,
        top_p: 0.1,
        presence_penalty: 0,
        // frequency_penalty: 0.5,
      });

    //Send the response to the channel
    message.reply(response.data.choices[0].text === "" ? "I don't know what to say" : response.data.choices[0].text.trim());
};