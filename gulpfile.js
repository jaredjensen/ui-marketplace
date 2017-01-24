require('require-dir')('./gulp');

var gulp = require('gulp');
gulp.task('default', ['script', 'sass', 'server'], function () {
    //console.log('watch!');
    gulp.watch('content/app/ts/**/*.ts', ['script']);
    gulp.watch('content/app/scss/modules/**/*.scss', ['sass']);
});

// gulp.task('watch', ['browserSync', 'sass'], function () {
//     gulp.watch(['app/**/*.scss', '!app/all.scss'], ['sass']);
//     gulp.watch('app/**/*.ts', ['tslint', 'typescript']);
//     gulp.watch(['app/**/*.js', '!app/all.*'], ['javascript']);
//     gulp.watch('*.html', browserSync.reload);
//     gulp.watch('app/all.min.css', function () { browserSync.reload({ stream: true }) });
//     gulp.watch('app/all.min.js', browserSync.reload); 
// });

// gulp.task('browserSync', function() {
//     browserSync.init({
//         server: { baseDir: '' }
//     });
// });