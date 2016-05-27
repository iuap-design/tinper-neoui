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
  'src/ui/u.scss',
  'src/ui-extend/u-extend.scss'
]

const UISrcPath = [
  // core
  'src/core/core/core.js',
  'src/core/core/event.js',
  'src/core/core/jsExtensions.js',
  'src/core/ajax/ajax.js',
  'src/core/base/base.js',
  'src/core/base/compMgr.js',
  'src/core/utils/i18n.js',
  'src/core/utils/rsautils.js',
  'src/core/utils/masker.js',
  'src/core/utils/formater.js',
  'src/core/utils/dateUtils.js',
  'src/core/utils/dataRender.js',
  'src/core/utils/hotKeys.js',

  // ui & Component
  'src/ui/base/BaseComponent.js',
  'src/ui/ripple/ripple.js',
  'src/ui/button/button.js',
  'src/ui/navlayout/navlayout.js',
  'src/ui/navmenu/navmenu.js',
  'src/ui/textfield/textfield.js',
  'src/ui/menu/menu.js',
  'src/ui/mdlayout/mdlayout.js',
  'src/ui/tabs/tabs.js',
  'src/ui/checkbox/checkbox.js',
  'src/ui/radio/radio.js',
  'src/ui/switch/switch.js',
  'src/ui/loading/loading.js',
  'src/ui/progress/progress.js',
  'src/ui/message/message.js',
  'src/ui/dialog/messageDialog.js',
  'src/ui/dialog/confirmDialog.js',
  'src/ui/dialog/threeBtnDialog.js',
  'src/ui/dialog/dialog.js',
  'src/ui/combobox/combobox.js',
  'src/ui/multilang/multilang.js',
  'src/ui/autocomplete/autocomplete.js',
  'src/ui/datetimepicker/datetimepicker.js',
  'src/ui/time/time.js',
  'src/ui/yearmonth/yearmonth.js',
  'src/ui/year/year.js',
  'src/ui/month/month.js',
  'src/ui/clockpicker/clockpicker.js',
  'src/ui/combobox/combo.js',
  'src/ui/datatable/data-table.js',
  'src/ui/pagination/pagination.js',
  'src/ui/tooltip/tooltip.js',
  'src/ui/validate/validate.js',
  'src/ui/refer/refer.js',
  'src/ui/slidePanel/slidePanel.js',
  'src/ui/end.js',

  // polyfill
  'src/vendor/polyfill/core.js',
  'src/vendor/polyfill/JsExtensions.js'
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

/**
 * 搬运图标字体，直接复制拷贝
 * @param  {[type]} 'font' [description]
 * @param  {[type]} (      [description]
 * @return {[type]}        [description]
 */
gulp.task('font', () => {
  gulp.src('./vendor/**')
    .pipe(rename(function(path){
      path.dirname += '';
    }))
    .pipe(copy('./dist'));
});

/**
 * 本地起一个静态 server ，用于调试
 * @param  {[type]} 'serve' [description]
 * @param  {[type]} (       [description]
 * @return {[type]}         [description]
 */
gulp.task('serve', () => {
    browserSync({
        files: ['src/*.js', 'dist'],
        server: {
            baseDir: "./"
        }
    });

    gulp.watch('./src/**/**/*.scss', ['sass']);
    gulp.watch(['./src/core/**/*.js', './src/ui/**/*.js'], ['es-ui']);

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

gulp.task('dev', ['font', 'sass-ui', 'es-ui', 'serve'])
gulp.task('prod', ['font', 'ui-js-dist', 'sass-ui'])
