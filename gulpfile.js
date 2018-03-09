
const fs = require('fs');
const path = require('path');

const gulp = require('gulp');
const marked = require('marked');
const sass = require('gulp-sass');

gulp.task('default', ['scss', 'md']);

gulp.task('md', () => {
	let parsed = marked(fs.readFileSync(path.join(__dirname, 'index.md'), 'utf-8')),
		template = fs.readFileSync(path.join(__dirname, 'template.html'), 'utf-8'),
		index = template.replace('<INCLUDE/>', parsed);
	fs.writeFileSync(path.join(__dirname, 'index.html'), index);
});

gulp.task('scss', () =>
	gulp.src('index.scss')
		.pipe(sass())
		.pipe(gulp.dest('.'))
);

gulp.task('watch', () => {
	gulp.watch('index.*', ['default']);
});
