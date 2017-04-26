let gulp = require('gulp');
let ts = require('gulp-typescript');
let sourcemaps = require('gulp-sourcemaps');

let tsProject = ts.createProject('tsconfig.json');

gulp.task('typescript', function () {
	return gulp.src('src/*.ts', { base: 'src' })
		.pipe(sourcemaps.init())
		.pipe(tsProject())
		.pipe(sourcemaps.write('./', {includeContent: false, sourceRoot: '../src'}))
		.pipe(gulp.dest('build'));
});

gulp.task('watch', ['typescript'], function () {
	gulp.watch(['src/**/*.ts'], {
		interval: 500
	}, ['typescript']);
});