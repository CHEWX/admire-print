// Processes
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    notify = require('gulp-notify'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync').create();

// Paths
var input = './assets/css/scss/**/*.scss',
    output = './assets/css',
    maps = './assets/css';

// Options
var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'expanded'
};

var autoPrefixerOptions = {
    browsers: ['last 10 versions', '> 5%', 'Firefox ESR']
};

// Tasks
gulp.task('sass', function () {
    return gulp
        .src(input)
        // Sourcemamps
        //.pipe(sourcemaps.init())
        .pipe(sass(sassOptions)).on('error', notify.onError(function (error) {
            return "Problem file -> " + error.message;
        }))

        // Write the sourcemap
        //.pipe(sourcemaps.write())
        // Prefix that shit
        .pipe(autoprefixer())
        .pipe(gulp.dest(output))
        .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
    return gulp.src([
        // This adds all files except main
        './assets/js/libs/*.js',
        './assets/js/src/*.js'
        ])
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./assets/js/'));
});

gulp.task('compress', function() {
    return gulp.src('./assets/js/main.js')
        .pipe(uglify())
        // @TODO - Need to output this to main.min.js not just main.js
        .pipe(gulp.dest('./assets/js/'));
});

gulp.task('watch', function() {
    return gulp
        .watch(input, ['sass']);
});

gulp.task('sass-compress', function () {
    return gulp
        .src(input)
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(autoprefixer(autoPrefixerOptions))
        .pipe(gulp.dest(output));
});

gulp.task('sync', function() {
    browserSync.init({
        open: false,
        proxy: "admireprint.dev"
    });
});

gulp.task('default', ['sync', 'watch']);
gulp.task('deploy', ['sass-compress', 'scripts']);