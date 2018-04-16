// Include gulp
var gulp = require('gulp'),
    watch = require('gulp-watch');

// Include plugins
var concat = require('gulp-concat');

// Concatenate JS Files
gulp.task('scripts', function() {
    return watch('src/*.js', function(){
        gulp.src(['app/bower_components/mousetrap/mousetrap.js',
                  'app/bower_components/angular-hotkeys/build/hotkeys.js',
                  'src/*.js'])
            .pipe(concat('helmsman.js'))
            .pipe(gulp.dest('build'));  
    });
});

// Copy html files
gulp.task('html', function() {
    return watch('src/*.html')
      .pipe(gulp.dest('build'));
});

// Default Task
gulp.task('default', ['scripts', 'html']);
