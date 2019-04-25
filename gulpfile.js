'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

// compile scss into css
function style() {
  // 1.where is my scss file
  return (
    gulp
      .src('./scss/**/*.scss')
      //2.pass that file through sass compiler and also look for errors
      .pipe(sass().on('error', sass.logError))
      //3.where do we want to save th compiled CSS?
      .pipe(gulp.dest('./css'))
      //  4/stream changes to the browser
      .pipe(browserSync.stream())
  );
}

function watch() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  gulp.watch('./scss/**/*.scss', style); //watch changes in scss
  gulp.watch('./*.html').on('change', browserSync.reload); //autoreload html
  gulp.watch('./js/**/*.js').on('change', browserSync.reload); //for js
}

exports.style = style;
exports.watch = watch;
