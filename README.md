# Vue 3 + TypeScript + Vite + Express: Verbal_Game_Prototype
Contributors:
Fergus L, Cole P, Beau M, and I

About:
In CM6312, you are required to create a prototype for a verbal game, which is akin to adventure games where players make decisions, choose different paths, and the game adapts based on their choices. This game includes standard game controls (pause, restart, etc.), your task is to develop a web-based version of the game as part of your coursework.

The project brief required a prototype game enabling verbal interaction, provifing proof-of-concept ideas for those with visual impairments to interact with a story based game. 
Although functionality requires button clicking, speech to text and sentiment analysis is implemented to demonstrate hands-free interaction with this story-game.
In addition, graphs are used to visualise 'in-story location' showing which choices have been taken and the options ahead as well as game statistics. Mocked functionality for game statistics as values are submitted using a form.

Technologies:
This project uses Express.js, Vue 3, TypeScript and Vite.
Vue3 for frontend and using Vite as the development server.
TypeScript for both frontend services and backend routes with Express.js.
Current confugured database is MariaDB.

Getting Started:
API Keys:
First, ensure you have an API key with OpenAI setting 'Model Capabilities' to 'Request' and 'Responses' to 'Write'. This enables functionality for Speech-to-text'

Add API key to .env, ensuring key name is 'OPENAI_API_KEY='.

Database:
Ensure MariaDB has the correct schema and data, files can be found in src/sql. Please refer to mariadb.com for further information on importing sql files: https://mariadb.com/docs/server/clients-and-utilities/backup-restore-and-import-clients/mariadb-import.

Node + NPM:
Ensure that node version is greater than or rqual to v23.7.0 and an NPM version of 11.4.2 or greater.

Environment variables:

The following variables need to be added to the .env, please add your own as appropriate:
OPENAI_API_KEY=
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
DB_PORT=

Launching the project:
The following instruction are inputted into CMD, Powe:rshell or GitBash in the 'CU_Y2_Verbal_Game_proto' folder:
Install NPM: npm i
Build the project: npm buildNow
Launch the server: npm dev:backend

This should launch the server on port 3000.

In your browser, enter http://localhost:3000/ in the search bar, the project should load.

Using the project:
The story is text based, follow the story and enjoy. When a decision can be made, you can select either of two paths using either the provided buttons or using voice input.
For voice input, click 'Speech-to-text' and enable the microphone if prompted and in your own words, choose whichever option you wish. Alternitively, you can obfuscate your selection and the sentiment analysis should understand your choice. When you are happy with your input, select 'submit'.
After playing the game, please provide your feedback in the form below and submit.
Once submitted, you can access the 'Dashboard' page and view other statistics there.

