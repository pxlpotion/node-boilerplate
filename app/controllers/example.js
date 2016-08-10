// This file should be deleted or renamed/refactored

'use strict'

module.exports = function(app, config) {

app.route('/')

  .get(function(req, res) {
    //res.send('this is an example GET response');
    // Or you can render HTML
    res.render('example', {text: 'Example Text'});
  })

  .post(function(req, res) {
    res.send('this is an example POST response');
    // Or you can render
    // res.render('example', {text: 'Example Text'});
  });

};
