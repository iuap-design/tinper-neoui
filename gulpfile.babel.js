'use strict';

import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import browserSync from 'browser-sync';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import minifycss from 'gulp-minify-css';
import sourcemaps from 'gulp-sourcemaps';
import babel from 'gulp-babel';
import copy from 'gulp-copy';
import clean from 'gulp-clean';
import util from 'gulp-util';

/**
 * SASS 源文件索引
 * @type {Array}
 */
const UISassSrcPath = [
  'scss/u.scss',
  'scss/u-extend.scss',
  'vendor/font-awesome/css/font-awesome.css'
]

const UISrcPath = [
  // 基础依赖
  'js/core/core.js',
  'js/core/base.js',
  'js/core/baseComponent.js',
  'js/core/ajax/ajax.js',
  'js/core/compMgr.js',
  // 工具方法
  'js/utilities/*.js',
  // ui 和 layout
  'js/*.js',
  // 加载控件
  'js/core/end.js'
]

const AUTOPREFIXER_BROWSERS = [
  'ie >= 11',
  'edge >= 20',
  'ff >= 44',
  'chrome >= 48',
  'safari >= 8',
  'opera >= 35',
  'ios >= 8'
]

/**
 * 公共错误处理函数
 * @param  {[type]} err [description]
 * @return {[type]}     [description]
 */
const errHandle = function ( err ) {
  let {
    // 报错文件名
    fileName,
    // 报错类型
    name,
    // 报错信息
    message,
    // 出错代码位置
    loc
  } = err;

  util.log(`报错文件：${fileName}
    报错类型：${name}
    出错代码位置：${loc.line},${loc.column}`);

  this.end();
}

/**
 * 编译 SASS 文件，并自动添加浏览器前缀
 * @param  {[type]} 'sass-ui' [description]
 * @param  {[type]} (         [description]
 * @return {[type]}           [description]
 */
gulp.task('sass-ui', () => {
  return gulp.src( UISassSrcPath )
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(gulp.dest('dist/css'));
});

/**
 * 编译并合并 UI 相关的 JS 文件
 * 用于开发环境，并支持 ES6/7 语法，可产出map文件
 * @param  {[type]} "es-ui" [description]
 * @param  {[type]} (       [description]
 * @return {[type]}         [description]
 */
gulp.task("es-ui", () => {
  return gulp.src( UISrcPath )
    .pipe(babel())
    .on('error', errHandle)
    .pipe(concat("u-ui.js"))
    .pipe(gulp.dest("dist/js"));
});

/**
 * 编译并合并压缩 UI 相关的 JS 文件，用于生产环境
 * @param  {[type]} 'ui-dist' [description]
 * @param  {[type]} function( [description]
 * @return {[type]}           [description]
 */
gulp.task('ui-js-dist', function(){
    return gulp.src( UISrcPath )
      .pipe(babel())
      .pipe(concat("u-ui.min.js"))
      .pipe(uglify())
      .pipe(gulp.dest('dist/js'))
});

gulp.task("polyfill", () => {
  return gulp.src('vendor/polyfill/*.js')
    .pipe(concat("u-polyfill.js"))
    .on('error', errHandle)
    .pipe(gulp.dest("dist/js"));
});

gulp.task("polyfill-dist", () => {
  return gulp.src('vendor/polyfill/*.js')
    .pipe(concat("u-polyfill.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"));
});

/**
 * 搬运图标字体，直接复制拷贝
 * @param  {[type]} 'font' [description]
 * @param  {[type]} (      [description]
 * @return {[type]}        [description]
 */
gulp.task('font', () => {
  return gulp.src('./vendor/font-awesome/fonts/*')
    .pipe(rename(function(path){
      path.dirname += '';
    }))
    .pipe(gulp.dest('./dist/fonts'));
});

/**
 * 本地起一个静态 server ，用于调试
 * @param  {[type]} 'serve' [description]
 * @param  {[type]} (       [description]
 * @return {[type]}         [description]
 */
gulp.task('serve', () => {
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
gulp.task('clean', () => {
  gulp.src('dist/*', { read: false })
    .pipe(clean({ force: true }))
    .on('error', errHandle);
});

gulp.task('dev', ['font', 'sass-ui', 'es-ui', 'polyfill', 'serve'])
gulp.task('prod', ['font', 'ui-js-dist', 'sass-ui', 'polyfill-dist'])
