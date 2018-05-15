
const fs = require('fs');
const path = require('path');

const gulp = require('gulp');

const marked = require('marked');
const htmlmin = require('html-minifier').minify;

const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cleanCSS = require('gulp-clean-css');

const browserSync = require('browser-sync').create();


gulp.task('default', ['html', 'css']);

gulp.task('html', done => {
	const processHTML = (source, dest) => {
		fs.writeFileSync(
			path.join(__dirname, dest),
			// marked doesn't parse the DOCTYPE declaration properly, insert here instead
			htmlmin(( '<!DOCTYPE html>\n' + marked(
				fs.readFileSync(path.join(__dirname, source), 'utf-8')
			)), {
				collapseWhitespace: true,
				removeComments: true
			})
		);
	}
	processHTML('main.html', 'index.html');
	processHTML('de/main.html', 'de/index.html');
	done();
});

gulp.task('css', () =>
	gulp.src('*.scss')
		.pipe(sass())
		.pipe(postcss([
			autoprefixer({browsers: ['last 2 versions', '> 1%']}),
		]))
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(gulp.dest('.'))
		.pipe(browserSync.stream())
);

gulp.task('reload', done => {
	browserSync.reload();
	done();
});

gulp.task('watch', () => {
	gulp.watch('main.html', ['html', 'reload']);
	gulp.watch('de/main.html', ['html', 'reload']);
	gulp.watch('*.scss', ['css']);
	gulp.watch('index.js', ['reload']);

	browserSync.init({
		server: {
			baseDir: "./"
		}
	});
});
