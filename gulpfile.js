const gulp = require("gulp");
const path = require("path");
const sass = require("gulp-sass");
const concatCss = require('gulp-concat-css');
const webpack = require("gulp-webpack");

const webpack_config = {
    entry: './src/js/index',
    output: {
        filename: 'scripts.js',
        path:__dirname
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: [
                    path.join(__dirname, 'src/js')
                ],
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react'],
                    plugins: ['transform-runtime', 'transform-object-rest-spread']
                }
            }
        ]
    }
}


gulp.task("js", function() {
	return gulp.src("src/js/index.js")
		.pipe(webpack(webpack_config))
		.pipe(gulp.dest("public"))
});

gulp.task("js:watch", function() {
	gulp.watch("src/js/**/*.{js,jsx}", gulp.parallel("js"));
});

gulp.task("sass", function() {
    return gulp.src("src/sass/**/*.{sass,scss}")
        .pipe(sass().on("error", sass.logError))
        .pipe(concatCss("styles.css"))
        .pipe(gulp.dest('public'));
});

// watch for sass files changes
gulp.task("sass:watch", function() {
    gulp.watch("src/sass/**/*.{sass,scss}", gulp.parallel("sass"));
});

gulp.task("watch", gulp.parallel(
	"js:watch", "sass:watch"
));

gulp.task("default", gulp.parallel(
	"js", "sass", "watch"
));