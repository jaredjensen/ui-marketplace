require('require-dir')('./gulp');

var gulp = require('gulp');

gulp.task('default', function () {
    gulp.watch('components/**/*.json', ['metadata']);
    gulp.watch('components/**/*.html', ['templates']);
    gulp.watch('components/**/*.scss', ['component-sass']);
    gulp.watch('app/js/**/*.js', ['app-script']);
    gulp.watch('app/scss/**/*.scss', ['app-sass']);
});

gulp.task('all', ['metadata', 'templates', 'component-sass', 'app-script', 'app-sass']);