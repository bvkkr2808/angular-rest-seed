var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    del = require('del'),
    flatten = require('gulp-flatten'),
    jshint = require('gulp-jshint'),
    minifycss = require('gulp-minify-css'),
    notify = require('gulp-notify'),
    ngAnnotate = require('gulp-ng-annotate'),
    source = require('vinyl-source-stream'),
    sourcemaps = require('gulp-sourcemaps'),
    streamify = require('gulp-streamify'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass')
    ;




var paths = {
    libs_js: ['bower_components/angular/angular.js',
        'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
        'bower_components/angular-resource/angular-resource.js',
        'bower_components/angular-route/angular-route.js'
    ],
    prod_out: 'resources/public/app',
    dev_out: 'dist/dev/app',
    js: ['./gui/**/*.js', '!./gui/**/*.spec.js'],
    tests: ['./gui/**/*.spec.js'],
    styles: ['./gui/styles/main.scss'],
    images: ['./gui/images/**/*'],
    html: ['./gui/**/*.html'],
    fonts: ['bower_components/bootstrap-sass-official/assets/fonts/**/*', 'bower_components/font-awesome/fonts/*']
};

gulp.task('clean', function (cb) {
    del(['dist/*'], cb)
});

gulp.task('lint', function () {
    return gulp.src(paths.js)
        .pipe(jshint())
        // You can look into pretty reporters as well, but that's another story
        .pipe(jshint.reporter('default'))
        .on("error", notify.onError(function (error) {
            return "Lint: JS problem: " + error.message;
        }));
});

gulp.task('html', function () {
    return gulp.src(paths.html)
        .pipe(gulp.dest(paths.dev_out))
        .pipe(connect.reload())
        .pipe(gulp.dest(paths.prod_out));
});

gulp.task('fonts', function () {
    return gulp.src(paths.fonts)
        .pipe(gulp.dest(paths.dev_out + '/fonts'))
        .pipe(gulp.dest(paths.prod_out + '/fonts'));
});

gulp.task('images', function () {
    return gulp.src(paths.images)
        .pipe(gulp.dest(paths.dev_out + '/images'))
        .pipe(gulp.dest(paths.prod_out + '/images'));
});


gulp.task('styles', function () {
    return gulp.src(paths.styles)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on("error", notify.onError(function (error) {
            return "CSS problem: " + error.message;
        }))
        .pipe(autoprefixer('last 2 version'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.dev_out + '/styles'))
        .pipe(connect.reload())
        .pipe(minifycss())
        .pipe(gulp.dest(paths.prod_out + '/styles'))
        .pipe(notify({ message: 'Saas styles task complete' }));
});

gulp.task('libs', function () {
    return gulp.src(paths.libs_js)
        .pipe(concat('libs.js'))
        .pipe(gulp.dest(paths.dev_out + '/js'))
        .pipe(connect.reload())
});

gulp.task('libs-prod', function () {
    return gulp.src(paths.libs_js)
        .pipe(concat('libs.js'))
        .pipe(streamify(uglify()))
        .pipe(gulp.dest(paths.prod_out + '/js'))
        .pipe(connect.reload())
});

gulp.task('test', function() {
    // Be sure to return the stream
    return gulp.src(paths.tests)
        .pipe(karma({
            configFile: 'karma.conf.js',
            action: 'run'
        }))
        .on('error', function(err) {
            // Make sure failed tests cause gulp to exit non-zero
            throw err;
        });
});

gulp.task('app', function () {
    return gulp.src(paths.js)
        .pipe(ngAnnotate())
        .pipe(concat('app.js'))
        .pipe(gulp.dest(paths.dev_out + '/js'))
        .pipe(connect.reload())
});

gulp.task('app-prod', function () {
    return gulp.src(paths.js)
        .pipe(ngAnnotate())
        .pipe(concat('app.js'))
        .pipe(streamify(uglify()))
        .pipe(gulp.dest(paths.prod_out + '/js'))
        .pipe(notify({ message: 'App prod task complete' }));
});

gulp.task('build-dev', ['clean'], function () {
    return gulp.start('libs', 'app', 'images', 'styles', 'html', 'fonts');
});

gulp.task('build-prod', ['build-dev'], function () {
    return gulp.start('app-prod', 'libs-prod');
});

gulp.task('watch', ['lint', 'build-dev'], function () {

    gulp.watch(paths.html, ['html']);

    gulp.watch(paths.styles, ['styles']);

    gulp.watch(paths.js, ['lint', 'test', 'app']);

});


gulp.task('server', function () {
    connect.server({
        root: ['dist/dev/'],
        port: 9000,
        livereload: true,
        middleware: function (connect, o) {
            return [ (function () {
                var url = require('url');
                var proxy = require('proxy-middleware');
                var options = url.parse('http://localhost:3000/api');
                options.route = '/api';
                return proxy(options);
            })() ];
        }
    });
});

gulp.task('default', function () {
    gulp.start('watch', 'server');
});
