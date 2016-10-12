'use strict';

// This file should be deleted or renamed/refactored

module.exports = (app, config) => {

app.route('/')

  .get((req, res) => {
    //res.send('this is an example GET response');
    // Or you can render HTML
    res.render('example', {routerClass: 'example', text: 'Example Text'});
  })

  .post((req, res) => {
    res.send('this is an example POST response');
    // Or you can render
    // res.render('example', {text: 'Example Text'});
  });

};
