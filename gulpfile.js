'use strict';

// Gulp and plugins
const returnConfig = require('./config/gulp'),
      gulp = require('gulp'),
      uglify = require('gulp-uglify'),
      source = require('vinyl-source-stream'),
      browserify = require('browserify'),
      watchify = require('watchify'),
      streamify = require('gulp-streamify'),
      runSequence = require('run-sequence'),
      clean = require('gulp-clean'),
      sass = require('gulp-sass'),
      prefixCSS = require('gulp-autoprefixer'),
      minifyCSS = require('gulp-minify-css'),
      imagemin = require('gulp-imagemin'),
      livereload = require('gulp-livereload'),
      chalk = require('chalk'),
      spawn = require('child_process').spawn;

// Define a generic config, this will be dynamically set before running any tasks
let config = returnConfig();
let node;

// Start/restart the actual server
gulp.task('server', function() {
  if (node) {
    node.kill();
  }
  node = spawn('node', ['app.js'], {stdio: 'inherit'});
  node.on('close', function (code) {
    if (code === 8) {
      console.log(chalk.red('Error detected, waiting for changes...'));
    }
  });
});

// Start the livereload "server" to reload the browser window on changes
gulp.task('livereload', function() {
  livereload.listen();
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
  return gulp.src(`${config.img.entry_point}/*.{png,gif,jpg,ico}`)
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
    .pipe(prefixCSS().on('error', (e) => {console.log(chalk.red(e));}))
    .pipe(minifyCSS().on('error', (e) => {console.log(chalk.red(e));}))
    .pipe(gulp.dest(config.path.dest));
});

// Compile JS
gulp.task('js', function(){
  return browserify({
    entries: [config.js.entry_point],
    transform: [['babelify', {presets: ['es2015']}]]
  })
    .bundle()
    .pipe(source(config.js.out))
    .pipe(streamify(uglify(config.js.out)).on('error', (e) => {console.log(chalk.red(e));}))
    .pipe(gulp.dest(config.path.dest));
});

// Define the watch task
gulp.task('observe', function() {
  // Watch Server and Config files
  const serverWatcher = gulp.watch([
    './*.*', // watch all files in root (files, not dirs)
    './app/server/**/*.*', // watch server files (client dir has own wathcers)
    './config/**/*.*', // watch config files
  ], ['server']);
  serverWatcher.on('change', (e) => {
    livereload.changed(e.path);
    console.log(chalk.dim(`SERVER ${e.type}: ${e.path}`));
  });
  // Watch Image files
  const imgWatcher = gulp.watch(`${config.img.entry_point}/*.{png,gif,jpg,ico}`, ['img']);
  imgWatcher.on('change', (e) => {
    livereload.changed(e.path);
    console.log(chalk.dim(`IMAGE ${e.type}: ${e.path}`));
  });
  // Watch SASS files
  const sassWatcher = gulp.watch(`${config.path.entry_point}/**/*.scss`, ['sass']);
  sassWatcher.on('change', (e) => {
    livereload.changed(e.path);
    console.log(chalk.dim(`SASS ${e.type}: ${e.path}`));
  });
  // Watch JS files
  // Note this does not use the 'js' task and instead uses wathify for faster builds
  const jsWatcher  = watchify(browserify({
    entries: [config.js.entry_point],
    transform: [['babelify', {presets: ['es2015']}]],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  }));
  jsWatcher.on('update', () => {
    jsWatcher.bundle()
      .pipe(source(config.js.out))
      .pipe(gulp.dest(config.path.dest))
      // Note that we use .pipe() to handle live reload here, instead of livereload.changed(e.path)
      // like the other watchers. This is because wathify does not pass back an event.
      .pipe(livereload());
      console.log(chalk.dim('JS File updated'));
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
  return runSequence('clean', ['js', 'sass', 'img']);
});

// Watch assets for development
gulp.task('watch', ['config:dev'], function() {
  // Build all the assets initially, start the server and reloader, watch for changes
  return runSequence(['img', 'sass', 'js'], 'server', 'livereload', 'observe');
});
