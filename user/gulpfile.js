 
const gulp = require('gulp');
const sass = require('gulp-sass');
//const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
 
gulp.task('sass', function () {
  return gulp.src('./src/scss/**/*.scss')
  .pipe(sass({outputStyle: 'compressed'}))
  .pipe(gulp.dest('./dist/css'))
  .pipe(browserSync.stream());
});
 
gulp.task('serve', function () {
  
  browserSync.init({
    server: "./"
  });

  gulp.watch("./src/scss/**/*.scss", ['sass']);  
  gulp.watch("./dist/**/*.scss").on('change', browserSync.reload);
  gulp.watch("./**/*.html").on('change', browserSync.reload);
  gulp.watch("./dist/**/*.js").on('change', browserSync.reload);
});