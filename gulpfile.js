
const fs = require('fs');
const path = require('path');

const gulp = require('gulp');

const marked = require('marked');
const htmlmin = require('html-minifier').minify;

const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const browserSync = require('browser-sync').create();


gulp.task('default', ['html', 'css', 'js']);

gulp.task('html', done => {
	fs.writeFileSync(
		path.join(__dirname, 'index.html'),
		// marked doesn't parse the DOCTYPE declaration properly, insert here instead
		htmlmin(( '<!DOCTYPE html>\n' + marked(
			fs.readFileSync(path.join(__dirname, 'main.html'), 'utf-8')
		)), {
			collapseWhitespace: true,
			removeComments: true
		})
	);
	done();
});

gulp.task('css', () =>
	gulp.src('index.scss')
		.pipe(sass())
		.pipe(postcss([
			autoprefixer({browsers: ['last 2 versions', '> 1%']}),
			cssnano()
		]))
		.pipe(gulp.dest('.'))
		.pipe(browserSync.stream())
);

gulp.task('js', done => {
	browserSync.reload();
	done();
});

gulp.task('watch', () => {
	gulp.watch('main.html', ['html']);
	gulp.watch('index.scss', ['css']);
	gulp.watch('index.js', ['js']);

	browserSync.init({
		server: {
			baseDir: "./"
		}
	});
});
