
const fs = require('fs');
const path = require('path');

const gulp = require('gulp');
const marked = require('marked');
const sass = require('gulp-sass');

gulp.task('default', ['scss', 'md']);

gulp.task('md', () =>
	fs.writeFileSync(
		path.join(__dirname, 'index.html'),
		// marked doesn't parse the DOCTYPE declaration properly, insert here instead
		'<!DOCTYPE html>\n' + marked(
			fs.readFileSync(path.join(__dirname, 'main.html'), 'utf-8')
		)
	)
);

gulp.task('scss', () =>
	gulp.src('index.scss')
		.pipe(sass())
		.pipe(gulp.dest('.'))
);

gulp.task('watch', () =>
	gulp.watch('*', ['default'])
);
