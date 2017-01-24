var gulp = require('gulp');
var gls = require('gulp-live-server');

gulp.task('server', function () {
    var server = gls.static('./', 3000);
    server.start();

    return gulp.watch(['content/app/app.min.css', '*.html'], function (file) {
        server.notify.apply(server, [file]);
    });
});