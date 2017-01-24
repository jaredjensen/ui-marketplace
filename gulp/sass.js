var gulp = require('gulp');

// Generate app.scss
gulp.task('sass-gen', function () {
    var glob = require('glob');
    var banner = '// Generated at ' + new Date().toISOString() + '.  Do not edit.';
    var imports = [ banner ];

    return glob('content/app/scss/modules/**/*.scss', function (err, files) {
        for (var i = 0; i < files.length; i++) {
            imports.push('@import "' + files[i].replace('content/app/scss', '.') + '";');
        }

        var fs = require('fs');
        fs.writeFileSync('content/app/scss/app.scss', imports.join('\r\n'));
    });
});

// Create app.css and app.min.css
gulp.task('sass', ['sass-gen'], function () {
    var sass = require('gulp-sass');
    var cssmin = require('gulp-cssmin');
    var header = require('gulp-header');
    var rename = require('gulp-rename');
    var banner = '/* Generated at ' + new Date().toISOString() + '.  Do not edit. */\r\n';
    return gulp.src('content/app/scss/app.scss')
        .pipe(sass())
        .pipe(header(banner))
        .pipe(gulp.dest('content/app'))
        .pipe(cssmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(header(banner))
        .pipe(gulp.dest('content/app'));
});