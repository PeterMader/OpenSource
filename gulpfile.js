
const fs = require('fs');
const path = require('path');

const gulp = require('gulp');

const marked = require('marked');
const htmlmin = require('html-minifier').minify;

const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

gulp.task('default', ['scss', 'md']);

gulp.task('md', () =>
	fs.writeFileSync(
		path.join(__dirname, 'index.html'),
		// marked doesn't parse the DOCTYPE declaration properly, insert here instead
		htmlmin(( '<!DOCTYPE html>\n' + marked(
			fs.readFileSync(path.join(__dirname, 'main.html'), 'utf-8')
		)), {
			collapseWhitespace: true,
			removeComments: true
		})
	)
);

gulp.task('scss', () =>
	gulp.src('index.scss')
		.pipe(sass())
		.pipe(postcss([
			autoprefixer({browsers: ['last 2 versions', '> 1%']}),
			cssnano()
		]))
		.pipe(gulp.dest('.'))
);

gulp.task('watch', () =>
	gulp.watch('*', ['default'])
);
