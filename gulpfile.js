var gulp = require("gulp");
var sass = require("gulp-sass");
var cleanCSS = require("gulp-clean-css");
var connect = require("gulp-connect");
var babel = require("gulp-babel");
var concat = require("gulp-concat");

function processHTML() {
	return gulp.src("src/html/**/*.html")
		.pipe(gulp.dest("dist/"))
		.pipe(connect.reload());
}

function processSass() {
	return gulp.src("src/sass/**/*.scss")
		.pipe(sass())
		.pipe(cleanCSS({ compatibility: "ie9" }))
		.pipe(gulp.dest("dist/assets/css"))
		.pipe(connect.reload());
}

function processJS() {
	return gulp.src("src/js/**/*.js")
	.pipe(babel({
	presets: ["@babel/env"]
	}))
	.pipe(concat('script.js'))
	.pipe(gulp.dest("dist/assets/js"))
	.pipe(connect.reload());
}	

function processImages() {
	return gulp.src(["src/img/**/*", "!src/images/**/thumb.db"])
	.pipe(gulp.dest("dist/assets/media"))
	.pipe(connect.reload());
}
function watch() {
	gulp.watch("src/sass/**/*.scss",
	{ ignoreInitial: false },
	processSass);
	
	gulp.watch("src/html/**/*.html",
	{ ignoreInitial: false },
	processHTML);

	gulp.watch("src/js/**/*.js",
	{ ignoreInitial: false },
	processJS);

	gulp.watch("src/img/**/*",
	{ ignoreInitial: false},
	processImages);
}

function server() {
	return connect.server({
    root: 'dist',
    livereload: true
  });
}

gulp.task("default", gulp.parallel(server, watch));
