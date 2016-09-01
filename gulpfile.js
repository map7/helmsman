// Include gulp
var gulp = require('gulp');

// Include plugins
var concat = require('gulp-concat');

// Concatenate JS Files
gulp.task('scripts', function() {
    return gulp.src(['app/bower_components/angular-hotkeys/build/hotkeys.js','src/*.js'])
      .pipe(concat('helmsman.js'))
      .pipe(gulp.dest('build'));
});

// Default Task
gulp.task('default', ['scripts']);
