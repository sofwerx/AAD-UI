# AAD - UI

AAD-UI that is the frontend, serviced by an AAD-API component.
Provides a front-end for users to post reviews and reports to be generated
from user provided metrics.

## Getting Started

### Prerequisites

The following are required to stand up a development environment. (Without Docker)

* [[NPM & Node]](https://www.npmjs.com/get-npm) - Needed to download packages and run server.
```
// To verify node install
node -v

// To verify npm is installed
npm -v
```

### Environment Variables
Create a `.env` file at directory root to override defaults.
````
NODE_ENV:           [development]
PUBLIC_URL:         [http://localhost:3001]
REACT_APP_API_URL:  [http://localhost:3000]

#DOCKER-ENV-VARIABLES
UI_PORT:            [3001]

````

### Installing
1. Clone this repo.  [[AAD-UI GITHUB]](https://github.com/sofwerx/AAD-UI).
2. Update `REACT_APP_API_URL` with API_URL if not default.
2. `npm install` to install all required dependencies.
3. `npm run start` Starts an instance.

## Docker Setup
To test docker functionality. You will need to install [Docker](https://docs.docker.com/compose/install/) locally.
* `docker-compose build` - Builds aad-ui.
* `docker-compose up` - Creates and attaches container instances.
* `docker-compose down` - Stop Container instances.
* docker-compose port forwards from `3001 -> 4100`. Change `UI_PORT` to override exposed port.


Should be able to hit a sample endpoint.
`localhost:3001/`

## Application Structure
- `components/App.js` - The entry point to our application. This file defines our react server. Holds routing structure.
- `agent.js` - Serves as an API abstraction that holds all API calls.
- `middleware.js` - Holds middleware logic to help drive reducer logic.
- `reducer.js` - Aggregate for all reducers in ./reducers.
- `assets/` -  Static assets.
- `reducers/` - Reducer files that drive state and logic of application.
- `constants/` - ActionTypes used by application and reducers.
- `components/` - React Components

## ESLint Code Styles
To maintain javascript code quality. An ESLint plugin is configured to use 
`airbnb-base` as the standard for it's analysis. Recommended to use `npm run dev`
to provide ongoing analysis.

## Production Deployment
[![Build Status](https://travis-ci.org/sofwerx/AAD-UI.svg?branch=master)](https://travis-ci.org/sofwerx/AAD-UI)

## Built With

* [Node](https://nodejs.org/en/docs/) - JavaScript Runtime Engine.
* [NPM](https://docs.npmjs.com/about-npm/) -  Javascript package manager.
* [React](https://reactjs.org/) - Javascript library for building User Interfaces.
* [React-Redux](https://react-redux.js.org/) - React bindings for Redux.

## UI Packages
* [Materialize-React](https://github.com/react-materialize/react-materialize) Material design for react, powered by materializecss

