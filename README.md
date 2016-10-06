# Pxl Potion Node/Express Boilerplate
This repo will serve as a boilerplate for standard MVC style Node.js applications. The application is built with minimum dependencies and is meant to be expanded on a per project basis.

To run:
- `git clone https://github.com/pxlpotion/node-boilerplate.git`
- `cd node-boilerplate`
- `npm install`
- `npm run build`
- `npm start`

The app should now be running on: `http://localhost:3000`. Note that this start script uses `nodemon` to monitor for changes and restart the server. A production script should be written to handle different deployments.

What to do next:
- Navigate to the `/config/config` file and setup different environment variables.
- Navigate to the `/app/controllers/example.js` file and either delete it or rename/refactor it.
- Navigate to the `/app/middlewares/example.js` file and either delete it or rename/refactor it.
- Navigate to the `/app/views/example.jade` file and either delete it or rename/refactor it.

The app makes no assumptions on models or what DB to use. You will need to setup your models in `app/models` and then setup your DB connection in `/config/express` and `/config/config`.

The little stuff:
- You may also want to add a `.jshintrc` file into the root of the directory (which is ignored via `.gitignore`) with the follow options:
```{ 
  "esversion": 6,
  "esnext": true,
  "node": true
}```

