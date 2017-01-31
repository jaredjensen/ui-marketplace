var gulp = require('gulp');

gulp.task('metadata', function () {
    var glob = require('glob');

    return glob('components/**/*.json', function (err, files) {
        var fs = require('fs');
        var regex = /([0-9a-z_\-]+)\.json/;

        var lines = [
            '// Generated at ' + new Date().toISOString() + '.  Do not edit.',
            '(function (app) {',
            '  app.components = { '
        ];

        for (var i = 0; i < files.length; i++) {
            var filename = files[i].match(regex)[1];
            var metadata = fs.readFileSync(files[i], 'utf-8')
                .replace(/\r\n/g, '\r\n    ');
            var line = `    "${filename}": ${metadata}`;
            if (i < files.length - 1) line += ',';
            lines.push(line);
        }

        lines.push('  };')
        lines.push('}(window.UIM));')

        fs.writeFileSync('app/js/modules/components.js', lines.join('\r\n'));
    });
});
