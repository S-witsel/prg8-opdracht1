import express from 'express'
import cors from 'cors';
import { ChatOpenAI } from "@langchain/openai"

// import { Anthropic } from "@anthropic-ai/sdk";

const app = express()

app.use(cors());

const model = new ChatOpenAI({
    azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
    azureOpenAIApiVersion: process.env.OPENAI_API_VERSION,
    azureOpenAIApiInstanceName: process.env.INSTANCE_NAME,
    azureOpenAIApiDeploymentName: process.env.ENGINE_NAME,
    maxRetries: 10,
})

// const anthropic = new Anthropic({
//     apiKey: "my_api_key", // defaults to process.env["ANTHROPIC_API_KEY"]
// });

app.use(express.json());

app.post('/getResponse', async (req, res) => {
    try {
        const prompt = req.body.prompt;

        const response = await model.invoke(prompt);

        res.json({ response: response.content });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// app.post('/getResponseANTHRO', async (req, res) => {
//     try {
//         const msg = await anthropic.messages.create({
//             model: "claude-3-opus-20240229",
//             max_tokens: 1000,
//             messages: [req.body.prompt]
//         });
//         console.log(msg);
//         res.json({ response: msg.content });
//     } catch (error) {
//         console.error("Error generating message:", error);
//     }
// });





const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});