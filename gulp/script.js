var gulp = require('gulp');

// Lint
gulp.task('tslint', function () {
    var tslint = require('gulp-tslint');
    return gulp.src('content/app/ts/**/*.ts')
        .pipe(tslint({
            configuration: 'tslint.json',
            formatter: 'verbose'
        }))
        .pipe(tslint.report());
});

// Transpile
gulp.task('typescript', function (cb) {
    var ts = require('gulp-typescript');
    return gulp.src(['content/app/ts/**/*.ts', '!content/app/ts/**/*.d.ts'], { base: '.' })
        .pipe(ts({ declaration: true }))
        .pipe(gulp.dest('.'));
});

// Concat and minify
gulp.task('script', ['tslint', 'typescript'], function (cb) {
    // Concat
    var concat = require('gulp-concat');
    gulp.src('content/app/ts/**/*.js')
        .pipe(concat('app.js'))
        .pipe(gulp.dest('content/app'));

    // Minify
    var pump = require('pump');
    var rename = require('gulp-rename');
    var uglify = require('gulp-uglify');
    pump([
        gulp.src('content/app/app.js'),
        uglify(),
        rename({ suffix: '.min' }),
        gulp.dest('content/app')
    ], cb);
});