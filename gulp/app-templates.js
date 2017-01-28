var gulp = require('gulp');

gulp.task('generate-templates', function () {
    var glob = require('glob');

    return glob('components/**/*.html', function (err, files) {
        var fs = require('fs');
        var regex = /([0-9a-z_\-]+)\.html/;

        var lines = [
            '// Generated at ' + new Date().toISOString() + '.  Do not edit.',
            '(function (app) {',
            '  app.templates = { '
        ];

        for (var i = 0; i < files.length; i++) {
            var filename = files[i].match(regex)[1];
            var template = fs.readFileSync(files[i], 'utf-8')
                .replace(/\r\n/g, '')
                .replace(/"/g, '\\"')
                .replace(/>\s*</g, '><');
            var line = `    "${filename}": "${template}"`;
            if (i < files.length - 1) line += ',';
            lines.push(line);
        }

        lines.push('  };')
        lines.push('} (window.UIM));')

        fs.writeFileSync('app/js/modules/templates.js', lines.join('\r\n'));
    });
});
