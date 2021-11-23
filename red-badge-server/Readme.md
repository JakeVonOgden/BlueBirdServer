# RedHawk, a Web App for reviewing anime.

## Motivation

Since i was a kid I have always enjoyed Anime, I have not seen many sites like this so i wanted to challenge myself to create something original that I think others would enjoy.

## Technologies

This Project utilizes node and express on the back end with a postgresql database, and react with typescript on the front end utilizing custom css, styled components, reactstrap, and framer motion for styling. I utilized the Jikan api to scrape data from the MyAnimeList website.

## Challenges

This was my first time using typescript and class components with React. This posed a lot of challenges with typing and general class component structure and component lifecycycle methods. I pushed through these challenges and have come out with a much better fundamental understanding of both.

## Features

This apps features include being able to search the Jikan api from anywhere in the website smoothly and create reviews for your anime of choice. You can also read and comment on other users reviews as well. It features full crud capability on The user table, review table, and comment table. It also has admin features to allow an admin to delete and update other users contributions.

## Getting started locally

1. `npm install`
1. Create your DB in PGAdmin with a name
1. Create a `.env` file
1. Copy the information found in the `.env.example` file and create your own `.env file`
1. Adjust the values in the env file to match your project
1. Modify the app.js file with the resetDatabase if you are currently building your models out
1. `nodemon` or `npx nodemon` to start server

### App created by Jacob Von Ogden