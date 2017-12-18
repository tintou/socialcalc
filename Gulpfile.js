var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var filesExist = require('files-exist');
var jshint = require('gulp-jshint');

js_top_file = 'module-wrapper-top.js';
js_bottom_file = 'module-wrapper-bottom.js';

js_files = [
    'socialcalcconstants.js',
    'socialcalc-3.js',
    'socialcalctableeditor.js',
    'formatnumber2.js',
    'formula1.js',
    'socialcalcpopup.js',
    'socialcalcspreadsheetcontrol.js',
    'socialcalcviewer.js'
];

gulp.task('validate-js', function () {
    for (js_file of filesExist(js_files)) {
        gulp.src(js_file)
            .pipe(jshint())
            .pipe(jshint.reporter('jshint-stylish'));
    }

    // We need the wrapper to be complete in order to process it.
    var module_wrapper_files = filesExist([js_top_file, js_bottom_file]);
    gulp.src(module_wrapper_files)
        .pipe(concat('module-wrapper.js'))
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});


gulp.task('js', ['validate-js'], function () {
    var files = filesExist([].concat(js_top_file, js_files, js_bottom_file));
    return gulp.src(files)
        .pipe(concat('SocialCalc.js'))
        .pipe(gulp.dest('.'));
});

gulp.task('default', ['js'], function () {});

