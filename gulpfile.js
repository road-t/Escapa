var gulp = require('gulp');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var js_obfuscator = require('gulp-js-obfuscator');


var sass = require('gulp-sass');
var coffee = require('gulp-coffee');
var slim = require('gulp-slim');
var minifycss = require('gulp-minify-css');

var sourcemaps = require('gulp-sourcemaps');

var connect = require('gulp-connect');

var source = 'src';
var dest = 'build';
var styles = 'css';
var scripts = 'js';

gulp.task('connect', function() {
    connect.server({
        livereload: true,
        root: 'build',
        port: 8888
    });
});

gulp.task('vendorjs', function() {
    return gulp.src(['angular.min.js', '*.js'], {cwd: source + '/assets/scripts/vendor'})
        .pipe(concat('lib.js'))
        .pipe(gulp.dest(dest + '/assets/js'))
        .pipe(connect.reload());
});

gulp.task('vendorcss', function() {
    gulp.src(source + '/assets/styles/vendor/*.css')
        .pipe(concat('lib.css'))
        .pipe(minifycss())
        .pipe(gulp.dest(dest + '/assets/css'))
        .pipe(connect.reload());
});

gulp.task('coffee', function() {
   gulp.src(source + '/js/*.coffee')
       .pipe(sourcemaps.init())
       .pipe(concat('app.js'))
       .pipe(coffee({bare: true}))
       .pipe(sourcemaps.write('./maps'))
       .pipe(gulp.dest(dest + '/assets/js'))
       .pipe(connect.reload());
});


gulp.task('coffee_prod', function() {
    gulp.src(source + '/js/*.coffee')
        .pipe(concat('app.js'))
        .pipe(coffee({bare: true}))
        .pipe(js_obfuscator())
        .pipe(gulp.dest(dest + '/assets/js'));
});

gulp.task('slim', function() {
    gulp.src(source + '/*.slim')
        .pipe(slim({pretty: true}))
        .on("error", errorHandler)
        .pipe(gulp.dest(dest))
        .pipe(connect.reload());
});

gulp.task('sass', function() {
    gulp.src(source + '/style/*.sass')
        .pipe(sass())
        .pipe(minifycss())
        .pipe(gulp.dest(dest + '/assets/css'))
        .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch(source + '/js/*.coffee', ['coffee']);
    gulp.watch(source + '/*.slim', ['slim']);
    gulp.watch(source + '/style/*.sass', ['sass']);
});

function errorHandler (error) {
    console.log(error.toString());
    this.emit('end');
}

gulp.task('default', ['coffee_prod', 'slim', 'sass']);

gulp.task('test', ['connect', 'watch']);

gulp.task('build', ['vendorjs', 'vendorcss', 'coffee_prod', 'slim', 'sass']);