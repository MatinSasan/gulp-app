const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');

gulp.task('sass', function() {
  return gulp
    .src('./scss/**/*.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});

gulp.task(
  'serve',
  gulp.series('sass', function() {
    browserSync.init({
      server: './'
    });
    gulp.watch('./scss/**/*.scss', gulp.series('sass'));
    gulp.watch('./*html').on('change', browserSync.reload);
  })
);

gulp.task('default', gulp.series('serve'));
