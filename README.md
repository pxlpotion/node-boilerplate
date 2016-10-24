# Pxl Potion Node/Express Boilerplate
This repo will serve as a boilerplate for standard MVC style Node.js applications. The application is built with minimum dependencies and is meant to be expanded on a per project basis.

## To run in development mode:
- `git clone https://github.com/pxlpotion/node-boilerplate.git`
- `cd node-boilerplate`
- `npm install`
- `npm run dev`

The app should now be running on: `http://localhost:3000`. Any changes will be automatically recompiled and the browser window will be automatically reloaded.

## To build for production
- `npm install`
- `npm run build`

NOTES:
- Gulp runs the `watch` task (aka `npm run dev`) with flag `-- silent` by default to remove all of the cruft in the terminal. This can be removed from the package.json file. The `build` task (aka `npm run build` does not run silently, but could...)
- A production script should be written to handle different deployments and assigned to `npm start`. There is no pre-described deployment script included.
- Any new CLI commands should be "piped" through an NPM script to keep things consistent. For example, a new Gulp script should be defined like `"exampleTask" : "gulp exampleTask"` in the scripts section of `package.json` and then run with NPM like `npm run exampleTask`

## What to do next:

### Server side
- Navigate to the `/ops/env.example` file and follow its directions.
- Navigate to the `/config/config.js` file and setup different environment variables.
- Navigate to the `/app/server/controllers/example.js` file and either delete it or rename/refactor it.
- Navigate to the `/app/server/middlewares/example.js` file and either delete it or rename/refactor it.
- Navigate to the `/app/server/views/example.pug` file and either delete it or rename/refactor it.

The app makes no assumptions on models or what DB to use. You will need to setup your models in `app/models` and then setup your DB connection in `/config/express.js` and `/config/config.js`.

### Client side
JS

- Navigate to the `/app/client/scripts/example.js` file and either delete it or rename/refactor it.
- Navigate to the `/app/client/main.js` file and update it accordingly. Note that any new JS files need to be imported from this main file in order to be compiled.

CSS

- Navigate to the `/app/client/styles/example.scss` file and either delete it or rename/refactor it.
- Navigate to the `/app/client/main.scss` file and update it accordingly. Note that any new SCSS files need to be imported from this main file in order to be compiled.

## The little stuff:
- You may also want to add a `.jshintrc` file into the root of the directory (which is ignored via `.gitignore`) with the follow options:
```{ 
  "esversion": 6,
  "esnext": true,
  "node": true,
  "browser": true
}```

