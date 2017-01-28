var gulp = require('gulp');

gulp.task('lint', function () {
    const jshint = require('gulp-jshint');
    return gulp.src('app/js/**/*.js')
        .pipe(jshint())/*
        .pipe(jshint.reporter('YOUR_REPORTER_HERE'))*/;
});

gulp.task('script', ['lint'], function (cb) {
    var concat = require('gulp-concat');
    gulp.src(['app/js/app.js', 'app/js/modules/*.js'])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('app'));

    var pump = require('pump');
    var rename = require('gulp-rename');
    var uglify = require('gulp-uglify');
    pump([
        gulp.src('app/app.js'),
        uglify(),
        rename({ suffix: '.min' }),
        gulp.dest('app')
    ], cb);
});