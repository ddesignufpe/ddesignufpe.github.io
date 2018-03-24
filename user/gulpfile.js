 
const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();

gulp.task('angularDependencies', function(){
  gulp.src([
    'node_modules/angular/angular.min.js',
    'node_modules/@uirouter/release/angular-ui-router.min.js'
  ])
  .pipe(concat('appDependencies.js'))
  .pipe(gulp.dest('./dist/js'));
});
 
gulp.task('sass', function () {
  console.log("Deu");
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