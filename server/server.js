import express from 'express'
import cors from 'cors';
import { ChatOpenAI } from "@langchain/openai"

const app = express()

app.use(cors());

const model = new ChatOpenAI({
    azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
    azureOpenAIApiVersion: process.env.OPENAI_API_VERSION,
    azureOpenAIApiInstanceName: process.env.INSTANCE_NAME,
    azureOpenAIApiDeploymentName: process.env.ENGINE_NAME,
    maxRetries: 10,
})

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

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});