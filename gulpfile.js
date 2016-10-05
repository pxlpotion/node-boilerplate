'use strict';

// Gulp and plugins
const gulp = require('gulp'),
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


// Paths for each task
// `config` is set before tasks are run via gulp CLI task which runs `returnConfig`
let config = {};
var returnConfig = function(mode) {
  mode = mode === 'prod' ? 'dist' : 'src';
  let path = {
    dest: `build/${mode}`,
    entry_point: `app/client`
  };
  let config = {
    path: path,
    js: {
      out: 'bundle.js',
      min_out: 'bundle.min.js',
      entry_point: `${path.entry_point}/main.js`
    },
    sass: {
      out: 'style.css',
      min_out: 'style.min.css',
      entry_point: `${path.entry_point}/main.scss`
    }
  };
  return config;
};

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
    .pipe(source(config.js.min_out))
    .pipe(streamify(uglify(config.js.min_out)).on('error', (e) => {console.log(e);}))
    .pipe(gulp.dest(config.path.dest));
});

// Define the watch task
gulp.task('watch', function() {
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
  return runSequence('config-dev', 'watch');
});
