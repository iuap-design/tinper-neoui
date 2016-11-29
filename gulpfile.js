'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifycss = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var base64 = require('gulp-base64');
var util = require('gulp-util');
var stripCssComments = require('gulp-strip-css-comments');

var version = require('./version.js');
var AUTOPREFIXER_BROWSERS = [
    'ie >= 11',
    'edge >= 20',
    'ff >= 44',
    'chrome >= 48',
    'safari >= 8',
    'opera >= 35',
    'ios >= 8'
];

/**
 * 公共错误处理函数
 * @param  {[type]} err [description]
 * @return {[type]}     [description]
 */
var errHandle = function ( err ) {
    // 报错文件名
    var fileName = err.fileName;
    // 报错类型
    var name = err.name;
    // 报错信息
    var message = err.message;

    var logInfo = '报错文件：' + fileName + '报错类型：' + name + '出错代码位置：' + err.lineNumber + ',' + err.column;

    util.log( err );

    this.end();
};

/**
 * 搬运图标字体，直接复制拷贝
 * @param  {[type]} 'font' [description]
 * @param  {[type]} (      [description]
 * @return {[type]}        [description]
 */

// gulp.task('font', function () {
//   gulp.src('./vendor/font-awesome/**')
//       .pipe(gulp.dest('./dist/fonts/font-awesome'));
//   return gulp.src('./fonts/**')
//          .pipe(gulp.dest('./dist/fonts'));
// });

gulp.task('fontcss', function() {
    gulp.src('./vendor/font-awesome/css/**')
        .pipe(gulp.dest('./dist/css'))
});
gulp.task('fontfile', function() {
    gulp.src(['./fonts/*.*','./vendor/font-awesome/fonts/*.*'])
        .pipe(gulp.dest('./dist/fonts'));

})

/**
 * 复制图片文件
 * @return {[type]}   [description]
 */
gulp.task('image', function () {
    return gulp.src('./vendor/images/**')
        .pipe(gulp.dest('./dist/images'));
});

/**
 * 本地起一个静态 server ，用于调试
 * @param  {[type]} 'serve' [description]
 * @param  {[type]} (       [description]
 * @return {[type]}         [description]
 */
gulp.task('serve', function () {
    browserSync({
        files: ['js/**/*.js', 'dist'],
        server: {
            baseDir: "./"
        }
    });

    gulp.watch('./scss/**/*.scss', ['sass']);
    gulp.watch(['./js/**/*.js'], ['es-ui']);

});

/**
 * 清空 dist 目录下的资源
 * @param  {[type]} 'clean' [description]
 * @param  {[type]} (       [description]
 * @return {[type]}         [description]
 */
gulp.task('clean', function () {
  gulp.src('dist/*', { read: false })
    .pipe(clean({ force: true }))
    .on('error', errHandle);
});

/**
 * 插件CSS 构建
 * 暂时不输出
 */
gulp.task('vsass', function(){
    gulp.src('./scss/**/*')
        .pipe(gulp.dest('./v1/scss/bundle'));
});
gulp.task('vcss', ['vsass'], function(){
    gulp.src('./v1/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./v1/lib/css'))
        .pipe(sourcemaps.init())
        .pipe(minifycss())
        .pipe(rename({
            suffix:'.min'
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./v1/lib/css'));
});

gulp.task('custom',function(){
    return gulp.src('./scss/ui/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./custom/'))
})

// gulp.task('dev', ['image', 'font', 'sass-ui', 'es-ui', 'polyfill', 'serve'])

/**
 * [执行重构后dist/css目录输出]
 * 不产出map文件
 */

gulp.task('buildcorecss',function(){
    gulp.src('./scss/core.scss')
        .pipe(sass())
        .pipe(base64())
        .pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
        .pipe(stripCssComments())
        .pipe(rename('u.core.css'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(minifycss())
        .pipe(rename({
            suffix:'.min'
        }))
        .pipe(gulp.dest('./dist/css'));
});
// 输出整体css文件dist/css/neoui.css
gulp.task('buildcss', ['buildcorecss'], function(){
    gulp.src('./scss/neoui.scss')
        .pipe(sass())
        .pipe(base64())
        .pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
        .pipe(stripCssComments())
        .pipe(rename('u.css'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(minifycss())
        .pipe(rename({
            suffix:'.min'
        }))
        .pipe(gulp.dest('./dist/css'));
});
// 逐一输出单个插件dist/css/plugins/
gulp.task('buildcssplugin',function(){
    gulp.src('./scss/ui/*.*')
        .pipe(sass())
        .pipe(gulp.dest('./dist/css/plugin'))
        .pipe(minifycss())
        .pipe(rename({
            suffix:'.min'
        }))
        .pipe(gulp.dest('./dist/css/plugin'));
});
gulp.task('distbuild', ['buildcss','buildcssplugin']);

/**
 * 输出合并后的:
 * neoui.css
 * neoui.min.css
 * neoui.js
 * neoui.min.js
 * neoui.js合并包含第三方插件
 * 添加头部信息
 */
gulp.task('buildjs', function(){
    gulp.src(['vendor/ui/*.js','dist/js/neoui.js'])
        .pipe(concat('neoui.js'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(uglify())
        .pipe(rename('neoui.min.js'))
        .pipe(gulp.dest('./dist/js'));

});
gulp.task('neo',['buildcss', 'buildjs'],function(){
    version.init([
        './dist/js/neoui.js',
        './dist/js/neoui.min.js'
    ]);
});
gulp.task('neoui', ['neo'], function(){
    version.init([
        './dist/css/u.css',
        './dist/css/u.min.css'
    ]);
});

gulp.task('dist', ['buildcss','buildjs', 'image','fontcss','fontfile'], function(){
    version.init([
        './dist/css/u.css',
        './dist/css/u.min.css'
    ]);
});
