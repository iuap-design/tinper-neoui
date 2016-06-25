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
var babel = require('gulp-babel');
var copy = require('gulp-copy');
var clean = require('gulp-clean');
var util = require('gulp-util');

/**
 * SASS 源文件索引
 * @type {Array}
 */
var UISassSrcPath = [
  'scss/u.scss',
  'scss/u-extend.scss',
  'vendor/font-awesome/css/font-awesome.css',
  'vendor/font-awesome/css/font-awesome.min.css'
]

var UISrcPath = [
  // 基础依赖
  // 'js/core/core.js',
  'js/core/BaseComponent.js',
  'js/ripple.js',
  'js/ui.button.js',
  'js/layout.nav.js',
  'js/ui.navmenu.js',
  'js/ui.textfield.js',
  'js/ui.menu.js',
  'js/layout.md.js',
  'js/ui.tabs.js',
  'js/ui.checkbox.js',
  'js/ui.radio.js',
  'js/ui.switch.js',
  'js/ui.loading.js',
  'js/ui.loader.js',
  'js/ui.progress.js',
  'js/ui.message.js',
  'js/messageDialog.js',
  'js/confirmDialog.js',
  'js/threeBtnDialog.js',
  'js/dialog.js',
  'js/combobox.js',
  'js/ui.multilang.js',
  'js/autocomplete.js',
  'js/datetimepicker.js',
  'js/time.js',
  'js/yearmonth.js',
  'js/year.js',
  'js/month.js',
  'js/clockpicker.js',
  'js/ui.combo.js',
  'js/data-table.js',
  'js/ui.pagination.js',
  'js/tooltip.js',
  'js/rating.js',
  'js/validate.js',
  'js/ui.refer.js',
  'js/slidePanel.js',
  'js/core/end.js',
  'js/mobiscroll.2.13.2.js',
  // 'js/core/base.js',
  // 'js/core/ajax.js',
  // 'js/core/compMgr.js',
  // 工具方法
  // 'js/utilities/*.js',
  // ui 和 layout
  // 'js/*.js',
  // 加载控件
  'js/core/core.js',
  'js/core/event.js',
  'js/utilities/jsExtensions.js',
  'js/core/ajax.js',
  'js/core/base.js',
  'js/core/compMgr.js',
  'js/utilities/i18n.js',
  'js/utilities/rsautils.js',
  'js/utilities/masker.js',
  'js/utilities/formater.js',
  'js/utilities/dateUtils.js',
  'js/utilities/dataRender.js',
  'js/utilities/hotKeys.js'  
]

var AUTOPREFIXER_BROWSERS = [
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
var errHandle = function ( err ) {
  // 报错文件名
  var fileName = err.fileName;
  // 报错类型
  var name = err.name;
  // 报错信息
  var message = err.message;
  // 出错代码位置
  var loc = err.loc;

  var logInfo = '报错文件：' + fileName + '报错类型：' + name + '出错代码位置：' + loc.line + ',' + loc.column;

  util.log( logInfo );

  this.end();
}

/**
 * 编译 SASS 文件，并自动添加浏览器前缀
 * @param  {[type]} 'sass-ui' [description]
 * @param  {[type]} (         [description]
 * @return {[type]}           [description]
 */
gulp.task('sass-ui', function () {
  return gulp.src( UISassSrcPath )
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('sass-ui-dist', function () {

  gulp.src('scss/u.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(minifycss())
    .pipe(rename('u.min.css'))
    .pipe(gulp.dest('dist/css'));

  gulp.src('scss/u-extend.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(minifycss())
    .pipe(rename('u-extend.min.css'))
    .pipe(gulp.dest('dist/css'));

});

/**
 * 编译并合并 UI 相关的 JS 文件
 * 用于开发环境，并支持 ES6/7 语法，可产出map文件
 * @param  {[type]} "es-ui" [description]
 * @param  {[type]} (       [description]
 * @return {[type]}         [description]
 */
gulp.task("es-ui", function () {
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

gulp.task("polyfill", function () {
  return gulp.src('vendor/polyfill/*.js')
    .pipe(concat("u-polyfill.js"))
    .on('error', errHandle)
    .pipe(gulp.dest("dist/js"));
});

gulp.task("polyfill-dist", function () {
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
gulp.task('font', function () {
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

gulp.task('dev', ['font', 'sass-ui', 'es-ui', 'polyfill', 'serve'])
gulp.task('default', ['font', 'sass-ui', 'sass-ui-dist', 'es-ui', 'polyfill', 'ui-js-dist', 'sass-ui', 'polyfill-dist'])
