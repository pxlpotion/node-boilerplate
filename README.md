# Pxl Potion Node/Express Boilerplate
This repo will serve as a boilerplate for standard MVC style Node.js applications. The application is built with minimum dependencies and is meant to be expanded on a per project basis.

## To run:
- `git clone https://github.com/pxlpotion/node-boilerplate.git`
- `cd node-boilerplate`
- `npm install`
- `npm run build`
- `npm start`

The app should now be running on: `http://localhost:3000`. Note that this start script uses `nodemon` to monitor for changes and restart the server. A production script should be written to handle different deployments.

## What to do next:

### Server side
- Navigate to the `/config/config.js` file and setup different environment variables.
- Navigate to the `/app/server/controllers/example.js` file and either delete it or rename/refactor it.
- Navigate to the `/app/server/middlewares/example.js` file and either delete it or rename/refactor it.
- Navigate to the `/app/server/views/example.pug` file and either delete it or rename/refactor it.

The app makes no assumptions on models or what DB to use. You will need to setup your models in `app/models` and then setup your DB connection in `/config/express.js` and `/config/config.js`.

### Client side
JS

- Navigate to the `/app/client/scripts/example.js` file and either delete it or rename/refactor it.
- Navigate to the `/app/client/main.js` file and update it accordingly.

CSS

- Navigate to the `/app/client/styles/example.scss` file and either delete it or rename/refactor it.
- Navigate to the `/app/client/main.scss` file and update it accordingly.

## The little stuff:
- You may also want to add a `.jshintrc` file into the root of the directory (which is ignored via `.gitignore`) with the follow options:
```{ 
  "esversion": 6,
  "esnext": true,
  "node": true,
  "browser": true
}```

