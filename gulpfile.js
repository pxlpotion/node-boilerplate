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
      minifyCSS = require('gulp-minify-css'),
      imagemin = require('gulp-imagemin'),
      spawn = require('child_process').spawn;

// Define a generic config, this will be dynamically set before running any tasks
let config = returnConfig();
let node;

// Start/restart the server
gulp.task('server', function() {
  if (node) {
    node.kill();
  }
  node = spawn('node', ['app.js'], {stdio: 'inherit'});
  node.on('close', function (code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
});

// Clean the enire target dir
gulp.task('clean', function () {
  return gulp.src(config.path.dest, {read: false})
    .pipe(clean());
});

// Clean just the img dir
// Used for watching imgs because we compress and pipe all imgs at once, which differs from
// JS/SASS which just replaces a single file
gulp.task('clean:img', function () {
  return gulp.src(`${config.path.dest}/images`, {read: false})
    .pipe(clean());
});

// Run lossless compression on all the images.
gulp.task('img', ['clean:img'], function() {
  return gulp.src(`${config.img.entry_point}/*.{png,gif,jpg}`)
    .pipe(imagemin({
      progressive: true,
      interlaced: true,
      svgoPlugins: [{removeUnknownsAndDefaults: false}, {cleanupIDs: false}]
    }))
    .pipe(gulp.dest(`${config.path.dest}/images`));
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
  // Watch Server and Config files
  gulp.watch([
    './*.*', // watch all files in root (files, not dirs)
    './app/server/**/*.*', // watch server files (client dir has own wathcers)
    './config/**/*.*', // watch config files
  ], ['server'], (e) => {
    console.log(`SERVER ${e.type}: ${e.path}`);
  });
  // Watch Image files
  gulp.watch(`${config.img.entry_point}/*.{png,gif,jpg}`, ['img'], (e) => {
    console.log(`IMAGE ${e.type}: ${e.path}`);
  });
  // Watch SASS files
  gulp.watch(`${config.path.entry_point}/**/*.scss`, ['sass'], (e) => {
    console.log(`SASS ${e.type}: ${e.path}`);
  });
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
gulp.task('config:prod', function() {
  config = returnConfig('prod');
});
gulp.task('config:dev', function() {
  config = returnConfig('dev');
});

// Build assets for production
gulp.task('build', ['config:prod'], function() {
  return runSequence(
    'clean',
    ['js', 'sass', 'img']
  );
});

// Watch assets for development
gulp.task('watch', ['config:dev'], function() {
  return runSequence('server', 'observe');
});
