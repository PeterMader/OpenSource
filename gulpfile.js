
const fs = require('fs');
const path = require('path');

const gulp = require('gulp');

const marked = require('marked');
const htmlmin = require('html-minifier').minify;

const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cleanCSS = require('gulp-clean-css');

// const imagemin = require('imagemin');
// const imageminJpegtran = require('imagemin-jpegtran');
// const imageminPngquant = require('imagemin-pngquant');
// const imagemingGifsicle = require('imagemin-gifsicle');

const browserSync = require('browser-sync').create();


// gulp.task('default', ['html', 'css', 'image']);
gulp.task('default', ['html', 'css']);

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
	gulp.src('*.scss')
		.pipe(sass())
		.pipe(postcss([
			autoprefixer({browsers: ['last 2 versions', '> 1%']}),
		]))
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(gulp.dest('.'))
		.pipe(browserSync.stream())
);

// fuck fsevents
// that stupid module makes installation for imagemin hang on linux

// gulp.task('image', () => {
// 	imagemin(['raw-images/*.{jpg,png,gif}'], 'images', {
// 		plugins: [
// 			imageminJpegtran(),
// 			imageminPngquant({quality: '65-80'}),
// 			imagemingGifsicle()
// 		]
// 	}).then(files => {
// 		files.forEach(obj =>
// 			fs.writeFileSync(
// 				path.join(__dirname, obj.path),
// 				data
// 			)
// 		)
// 	});
// });

gulp.task('reload', done => {
	browserSync.reload();
	done();
});

gulp.task('watch', () => {
	gulp.watch('main.html', ['html', 'reload']);
	gulp.watch('*.scss', ['css']);
	gulp.watch('index.js', ['reload']);
	// gulp.watch('raw-images/*', ['image']);

	browserSync.init({
		server: {
			baseDir: "./"
		}
	});
});
