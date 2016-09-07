// Include gulp
var gulp = require('gulp'),
    watch = require('gulp-watch');

// Include plugins
var concat = require('gulp-concat');

// Concatenate JS Files
gulp.task('scripts', function() {
    return watch(['app/bower_components/mousetrap/mousetrap.js',
                     'app/bower_components/angular-hotkeys/src/hotkeys.js',
                  'src/*.js'], {ignoreInitial: false})
      .pipe(concat('helmsman.js'))
      .pipe(gulp.dest('build'));
});

// Copy html files
gulp.task('html', function() {
    return watch('src/*.html', {ignoreInitial: false})
      .pipe(gulp.dest('build'));
});

// Default Task
gulp.task('default', ['scripts', 'html']);
