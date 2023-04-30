Decision Maker
=========

## Project Description
___
***Decision Maker*** features multiple pages, some of which take advantage of AJAX technology for seamless communication with the backend.  
This application is designed to simplify the decision-making process. With just a few clicks, users can create a new poll and specify their options. 
The application then generates two links, one for sharing with potential voters and the other for checking the current poll results. 
All tedious calculations are handled by the application, leaving you with more time to focus on other important matters.  
Whenever someone votes on your poll, our application sends you a notification via email. This ensures that you are always up-to-date on the latest poll results.
___

## Project Setup

The following steps are only for _one_ of the group members to perform.

1. Create your own copy of this repo using the `Use This Template` button, ideally using the name of your project. The repo should be marked Public
2. Verify that the skeleton code now shows up in your repo on GitHub, you should be automatically redirected
3. Clone your copy of the repo to your dev machine
4. Add your team members as collaborators to the project so that they can push to this repo
5. Let your team members know the repo URL so that they use the same repo (they should _not_ create a copy/fork of this repo since that will add additional workflow complexity to the project)


## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
- DB_HOST= `{host-name}`
- DB_USER= `{database-user}`
- DB_PASS= `{database-password}`
- DB_NAME= `{database-name}`
- DB_PORT= `{database-port}`
- OUTLOOK_USER= `{email address for sending emails}`
- OUTLOOK_PASS= `{password of the email}`
3. Install dependencies: `npm i`
4. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
5. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
6. Visit `http://localhost:8080/`

## Dependencies

- Node 10.x or above
- Express
- Morgan
- NPM 5.x or above
- PG 6.x
- Nodemailer
- Chalk
- Dotenv
- EJS
- SASS
