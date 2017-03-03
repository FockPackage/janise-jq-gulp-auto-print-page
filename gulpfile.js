const gulp = require('gulp');
const gutil = require('gulp-util');
const livereload = require('gulp-livereload');
const plumber = require('gulp-plumber');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');
const del = require('del');
const webserver = require('gulp-webserver');
const wrap = require('gulp-wrap');
const declare = require('gulp-declare');
const concat = require('gulp-concat');
const jade = require('gulp-jade');


gulp.task("template", function () {
    gulp.src("./src/index.jade")
        .pipe(plumber())
        .pipe(jade({ pretty: true }))
        .pipe(gulp.dest('./dist/'))
        .pipe(livereload());
});

gulp.task('webserver', function () {
    gulp.src('./dist/')
        .pipe(webserver({
            livereload: true,
            directoryListing: true,
            open: true
        }));
});

// less编译任务
gulp.task('style', function () {
    gulp.src("src/main.less")
        .pipe(plumber())
        .pipe(less())
        .pipe(gulp.dest('dist/'))
        .pipe(livereload());
});
/**
 * todo: 侦听less有变化并编译
 */
gulp.task('styles-watch', () => {
    gulp.watch(("src/*.less"), ['style']);
});


// 监听任务
gulp.task("jade-watch", function () {
    livereload.listen();
    // 监听jade变化并执行jade编译任务
    gulp.watch("./src/**/*.jade", function () {
        gulp.run("template");
    });
});



/**
 * todo: 用于npmstart, (开发模式)
 */
gulp.task('default', [
    'style',
    'styles-watch',
    'jade-watch'
], () => {
    gutil.log(gutil.colors.green('进入开发模式,监听事件已经打开。。。。。。'));
});
