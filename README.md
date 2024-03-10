This little project allows someone to give a prompt, wether thats a single word or an entire story, to generate a very simplified DND character sheet. it also allows them to chat with said character for fun.

INSTALLATION AND SETUP
1. Clone the repository so that its locally on your pc
2. Open the project in whaterver code editor you prefer (i used PHPstorm to develop this)
3. use terminal in editor to navigate to server folder
4. do the following commands on the server: npm install, npm install express, npm install cors ,npm install langchain/openai
5. create aan .env file inside the server folder and fill the following fields with your info:
    OPENAI_API_TYPE=azure
    OPENAI_API_VERSION=2023-12-01-preview
    OPENAI_API_BASE=
    AZURE_OPENAI_API_KEY=(you need to get your won api key)
    ANTHROPIC_API_KEY=(currently not working in this project, no need to fill this)
    DEPLOYMENT_NAME=deploy-text-embedding-ada
    ENGINE_NAME=deploy-gpt-35-turbo
    INSTANCE_NAME=
6. now use npm run dev on the server to make it run
7. no navigate with terminal to the client folder
8. open a preview of the html file in your browser
9. have fun!

NOTES:
- the server somethimes takes awhile to start running after npm run dev, and somethimes you need to run npm run dev twice for some reason. if the console says "Server is running on port 3000" then its working correctly.
- At the moment the ANTHRO api isnt working and the only error that it gives is that the key isnt correct, which makes no sense as i copy pasted the key into my project when i tried to implement it.
- rarely the openai API does not give a response in the correct format, even tho i explicitly stated to it that this isnt allowed. hes a rebellious teenager.
