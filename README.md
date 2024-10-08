# Simple System

This code challenge has been developer in React + Typescript. I am using Vite as development server.

To help me with the UI, I am also using Material UI https://mui.com/material-ui/

First, I went into the github documentation, and after some research, I discovered that I will need to make use of 2 api endpoints.

This one: https://docs.github.com/en/rest/search/search?apiVersion=2022-11-28#search-users to search for users and get a list of results.

This one: https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#list-repositories-for-a-user to get the repositories of an specific user.

I also discovered that I need a token in order to send my requests. I created it following the documentation https://docs.github.com/en/rest/quickstart?apiVersion=2022-11-28

I just hardcoded the token into the "gitHubService.ts" file. This should not be the proper way to do it, it should be done in a .env file for example. But for the purpose of this code challenge, it should be just fine.

In order to run the app, first run a `npm i` to install dependencies, followed by a `npm run dev` to run the app.

Just write your query in the input field, and after a debounce of 500 ms, you should get your results.

Maybe you will experience that after several requests, suddently no results are being shown. That is because the service has a limit in the number of requests you can make in a certain period of time. If that happens, just wait a few minutes until the service allows you to implement new requests.

I also implemented some E2E tests using Cypress. I order to open the Cypress test suit, keep the server running and in a new terminal run `npm run cy:open`.

You will get a very intuitive interface that will allow you to run the test in several browsers.
