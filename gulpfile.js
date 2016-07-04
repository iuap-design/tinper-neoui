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

var makeumd = require('./makeumd.js');
/**
 * SASS 源文件索引
 * @type {Array}
 */
var UISassSrcPath = [
    'scss/u.scss',
    'scss/u-extend.scss',
]

var UISrcPath = [
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
    'js/utilities/hotKeys.js',
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
    'js/ui.combo.js',
    'js/data-table.js',
    'js/ui.pagination.js',
    'js/tooltip.js',
    'js/rating.js',
    'js/validate.js',
    'js/ui.refer.js',
    'js/slidePanel.js',
    'js/core/end.js',
    'js/mobiscroll.2.13.2.js'
]

var polyPath = [
    'vendor/polyfill/core.js',
    'vendor/polyfill/JsExtensions.js',
    'vendor/polyfill/respond.js'
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

gulp.task('sass-ui-u-init', function () {

    return gulp.src('scss/u.scss')
        .pipe(sass().on('error', errHandle))
        .pipe(base64().on('error',errHandle))
        .pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
        .pipe(gulp.dest('dist/css'))
        .pipe(minifycss())
        .pipe(rename('u.min.css'))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('sass-ui-u-extend-init', function(){
    return gulp.src('scss/u-extend.scss')
        .pipe(sass().on('error',errHandle))
        .pipe(base64().on('error',errHandle))
        .pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
        .pipe(gulp.dest('dist/css'))
        .pipe(minifycss())
        .pipe(rename('u-extend.min.css'))
        .pipe(gulp.dest('dist/css'));
})

gulp.task('sass-ui', ['sass-ui-u-init', 'sass-ui-u-extend-init'], function(){
    makeumd.init([
            'dist/css/u.css',
            'dist/css/u.min.css',
            'dist/css/u-extend.css',
            'dist/css/u-extend.min.css'
        ]);
})


/**
 * 编译并合并 UI 相关的 JS 文件
 * 用于开发环境，并支持 ES6/7 语法，可产出map文件
 * @param  {[type]} "es-ui" [description]
 * @param  {[type]} (       [description]
 * @return {[type]}         [description]
 */
gulp.task("es-ui-init", function () {
    return gulp.src( UISrcPath )
            .pipe(concat('u-ui.js'))
            .pipe(gulp.dest('./dist/js'))
            .pipe(uglify().on('error', errHandle))
            .pipe(rename('u-ui.min.js'))
            .pipe(gulp.dest('./dist/js'));
});

gulp.task('es-ui', ['es-ui-init'], function(){
     makeumd.init([
            'dist/js/u-ui.js',
            'dist/js/u-ui.min.js',
        ]);
})


gulp.task("polyfill-init", function () {
    return gulp.src(polyPath)
            .pipe(concat("u-polyfill.js"))
            .pipe(gulp.dest("./dist/js"))
            .pipe(uglify())
            .on('error', errHandle)
            .pipe(concat("u-polyfill.min.js"))
            .pipe(gulp.dest("./dist/js"));
});


gulp.task('polyfill', ['polyfill-init'], function(){
     makeumd.init([
            'dist/js/u-polyfill.js',
            'dist/js/u-polyfill.min.js',
        ]);
})


/**
 * 搬运图标字体，直接复制拷贝
 * @param  {[type]} 'font' [description]
 * @param  {[type]} (      [description]
 * @return {[type]}        [description]
 */
gulp.task('font', function () {
  return gulp.src('./vendor/font-awesome/**')
    .pipe(gulp.dest('./dist/fonts/font-awesome'));
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
gulp.task('dist', ['font', 'sass-ui', 'es-ui', 'polyfill'])
