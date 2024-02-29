// express

//communicatie met Azure API

import { ChatOpenAI } from "@langchain/openai"

const model = new ChatOpenAI({
    azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
    azureOpenAIApiVersion: process.env.OPENAI_API_VERSION,
    azureOpenAIApiInstanceName: process.env.INSTANCE_NAME,
    azureOpenAIApiDeploymentName: process.env.ENGINE_NAME,
})

const joke = await model.invoke("tell me a programmer joke")
console.log(joke.content)