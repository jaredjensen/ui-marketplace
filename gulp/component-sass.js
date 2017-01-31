var gulp = require('gulp');

gulp.task('component-sass-gen', function () {
    var glob = require('glob');
    var banner = '// Generated at ' + new Date().toISOString() + '.  Do not edit.';
    var imports = [ banner ];

    return glob('components/**/*.scss', function (err, files) {

        for (var i = 0; i < files.length; i++) {
            if (files[i].split('/').length < 3) continue;
            imports.push('@import "' + files[i].replace('components', '.') + '";');
        }

        var fs = require('fs');
        fs.writeFileSync('components/all.scss', imports.join('\r\n'));
    });
});

gulp.task('component-sass', ['component-sass-gen'], function () {
    var sass = require('gulp-sass');
    var cssmin = require('gulp-cssmin');
    var header = require('gulp-header');
    var rename = require('gulp-rename');
    var banner = '/* Generated at ' + new Date().toISOString() + '.  Do not edit. */\r\n';
    return gulp.src('components/all.scss')
        .pipe(sass())
        .pipe(header(banner))
        .pipe(gulp.dest('components'))
        .pipe(cssmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(header(banner))
        .pipe(gulp.dest('components'));
});