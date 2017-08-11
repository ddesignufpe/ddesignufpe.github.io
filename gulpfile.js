var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('default', function(){
    gulp.src('./src/scss/style.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dist/css'));
});

gulp.watch('./src/**/*.scss',['default']);