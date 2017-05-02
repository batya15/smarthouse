let gulp = require('gulp');
let ts = require('gulp-typescript');
let sourcemaps = require('gulp-sourcemaps');
let gulpTslint = require("gulp-tslint");
let tsProject = ts.createProject('tsconfig.json');


function typescript(path, error) {
	return gulp.src(path, { base: 'src' })

		.pipe(gulpTslint({
			formatter: "verbose"
		}))
		.pipe(gulpTslint.report({
			emitError: error
		}))

		.pipe(sourcemaps.init())
		.pipe(tsProject())
		.pipe(sourcemaps.write('./', {includeContent: false, sourceRoot: '../src'}))
		.pipe(gulp.dest('build'));
}

gulp.task('typescript', () => typescript('src/**/*.ts', true));

gulp.task('watch', ['typescript'], function () {
	gulp.watch(['src/**/*.ts'], {
		interval: 500
	}, function (file) {
		let run = new Date();
		return typescript(file.path, false)
			.on('end', () => console.log("compile: " + file.path + " after " + (Date.now() - run) + "ms"));
	});
});