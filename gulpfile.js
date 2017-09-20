'use strict';

var gulp = require('gulp');
var webpack = require('gulp-webpack');
var stylus = require('gulp-stylus');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var rigger = require('gulp-rigger');
var imagemin = require('gulp-imagemin');
var rimraf = require('rimraf');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var cssnano = require('gulp-cssnano');

var path = {
  dist: {
    html: 'dist/',
    js: 'dist/js/',
    css: 'dist/css/',
    img: 'dist/img/'
  },
  src: {
    html: 'src/*.html',
    js: 'src/js/main.js',
    style: 'src/style/common.styl',
    img: 'src/img/*.*'
  },
  watch: {
    html: 'src/**/*.html',
    js: 'src/js/**/*.js',
    style: 'src/style/**/*.styl',
    img: 'src/img/**/*.*'
  },
  clean: './dist'
};

var config = {
  server: {
    baseDir: './dist'
  },
  tunnel: true,
  host: 'localhost',
  port: 9000,
  logPrefix: 'sasin'
};

gulp.task('webserver', function () {
  browserSync(config);
});

gulp.task('clean', function (cb) {
  rimraf(path.clean, cb);
});

gulp.task('html:dist', function () {
  gulp.src(path.src.html)
    .pipe(rigger())
    .pipe(gulp.dest(path.dist.html))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('js:dist', function () {
  gulp.src(path.src.js)
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.dist.js))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('style:dist', function () {
  gulp.src(path.src.style)
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(cssnano())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.dist.css))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('img:dist', function () {
  gulp.src(path.src.img)
    .pipe(imagemin())
    .pipe(gulp.dest(path.dist.img))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('dist', [
  'html:dist',
  'js:dist',
  'style:dist',
  'img:dist'
]);

gulp.task('watch', function () {
  watch([path.watch.html], function () {
    gulp.start('html:dist');
  });
  watch([path.watch.style], function () {
    gulp.start('style:dist');
  });
  watch([path.watch.js], function () {
    gulp.start('js:dist');
  });
  watch([path.watch.img], function () {
    gulp.start('img:dist');
  });
});

gulp.task('default', ['dist', 'webserver', 'watch']);
