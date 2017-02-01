var gulp = require('gulp');
var SASS_ROOT = 'app/scss';

// Generate app.scss
gulp.task('app-sass-gen', function () {
    var glob = require('glob');
    var banner = '// Generated at ' + new Date().toISOString() + '.  Do not edit.';
    var imports = [ banner ];

    return glob(SASS_ROOT + '/modules/**/*.scss', function (err, files) {
        for (var i = 0; i < files.length; i++) {
            imports.push('@import "' + files[i].replace(SASS_ROOT, '.') + '";');
        }

        var fs = require('fs');
        fs.writeFileSync(SASS_ROOT + '/app.scss', imports.join('\r\n'));
    });
});

// Create app.css and app.min.css
gulp.task('app-sass', ['app-sass-gen'], function () {
    var sass = require('gulp-sass');
    var cssmin = require('gulp-cssmin');
    var header = require('gulp-header');
    var rename = require('gulp-rename');
    var banner = '/* Generated at ' + new Date().toISOString() + '.  Do not edit. */\r\n';
    return gulp.src(SASS_ROOT + '/app.scss')
        .pipe(sass())
        .pipe(header(banner))
        .pipe(gulp.dest('app'))
        .pipe(cssmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(header(banner))
        .pipe(gulp.dest('app'));
});