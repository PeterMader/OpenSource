
const fs = require('fs');
const path = require('path');

const gulp = require('gulp');
const marked = require('marked');

gulp.task('default', () => {
	let parsed = marked(fs.readFileSync(path.join(__dirname, 'index.md')));
	let template = fs.readFileSync(path.join(__dirname, 'template.html'));
	template.replace('<INCLUDE/>', parsed);
	fs.writeFileSync(path.join(__dirname, 'index.html'), template);
});
