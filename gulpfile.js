var gulp = require('gulp'),
	sass = require('gulp-sass'),
	php = require('gulp-connect-php'),
	browserSync = require('browser-sync');

gulp.task('sass', function() {
	return gulp.src('app/sass/*.sass')
		.pipe(sass())
		.pipe(gulp.dest('app/css/'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('php', function() {
    php.server({ base: 'app', port: 8010, keepalive: true});
});

gulp.task('browser-sync',['php'], function() {
    browserSync({
        proxy: '127.0.0.1:8010',
        port: 8080,
        open: true,
        notify: false
    });
});

gulp.task('default', ['browser-sync', 'sass'], function() {
	gulp.watch('app/sass/*.sass', [sass]);
	gulp.watch('app/*.php', browserSync.reload);
	gulp.watch('app/js/*.js', browserSync.reload);
});
