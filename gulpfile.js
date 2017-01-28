require('require-dir')('./gulp');

var gulp = require('gulp');
gulp.task('default', function () {
    gulp.watch('components/**/*.html', ['generate-templates']);
    gulp.watch('components/**/*.scss', ['component-sass']);
    gulp.watch('app/js/**/*.js', ['script']);
    gulp.watch('app/scss/**/*.scss', ['sass']);
});