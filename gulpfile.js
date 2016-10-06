'use strict';

// Gulp and plugins
const returnConfig = require('./config/gulp'),
      gulp = require('gulp'),
      uglify = require('gulp-uglify'),
      source = require('vinyl-source-stream'),
      browserify = require('browserify'),
      watchify = require('watchify'),
      streamify = require('gulp-streamify'),
      runSequence = require('gulp-run-sequence'),
      clean = require('gulp-clean'),
      sass = require('gulp-sass'),
      prefixCSS = require('gulp-autoprefixer'),
      minifyCSS = require('gulp-minify-css');

// Define a generic config, this will be dynamically set before running any tasks
let config = returnConfig();

// Clean the target dir
gulp.task('clean', function () {
  return gulp.src(config.path.dest, {read: false})
    .pipe(clean());
});

// Compile SASS
gulp.task('sass', function () {
  return gulp.src(config.sass.entry_point)
    .pipe(sass().on('error', sass.logError))
    .pipe(prefixCSS().on('error', (e) => {console.log(e);}))
    .pipe(minifyCSS().on('error', (e) => {console.log(e);}))
    .pipe(gulp.dest(config.path.dest));
});

// Compile JS
gulp.task('js', function(){
  browserify({
    entries: [config.js.entry_point],
    transform: [['babelify', {presets: ['es2015']}]]
  })
    .bundle()
    .pipe(source(config.js.out))
    .pipe(streamify(uglify(config.js.out)).on('error', (e) => {console.log(e);}))
    .pipe(gulp.dest(config.path.dest));
});

// Define the watch task
gulp.task('observe', function() {
  // Watch SASS files
  const sassWatcher = gulp.watch(`${config.path.entry_point}/**/*.scss`, ['sass']);
  sassWatcher.on('change', (e) => {console.log(`SASS ${e.type}: ${e.path}`);});
  // Watch JS files
  const jsWatcher  = watchify(browserify({
    entries: [config.js.entry_point],
    transform: [['babelify', {presets: ['es2015']}]],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  }));
  return jsWatcher.on('update', function () {
    jsWatcher.bundle()
      .pipe(source(config.js.out))
      .pipe(gulp.dest(config.path.dest));
      console.log('JS File updated');
  })
    .bundle()
    .pipe(source(config.js.out))
    .pipe(gulp.dest(config.path.dest));
});


// Setup the config for prod or dev
gulp.task('config-prod', function() {
  config = returnConfig('prod');
});
gulp.task('config-dev', function() {
  config = returnConfig('dev');
});

// Build assets for production
gulp.task('build', function() {
  return runSequence(
    'config-prod',
    'clean',
    ['js', 'sass']
  );
});

// Watch assets for development
gulp.task('watch', function() {
  return runSequence('config-dev', 'observe');
});
