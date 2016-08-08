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
    'js/extend/ripple.js',
    'js/ui.button.js',
    'js/layout.nav.js',
    'js/ui.navmenu.js',
    'js/ui.textfield.js',
    'js/extend/ui.menu.js',
    'js/layout.md.js',
    'js/ui.tabs.js',
    'js/ui.checkbox.js',
    'js/ui.radio.js',
    'js/ui.switch.js',
    'js/extend/ui.loading.js',
    'js/extend/ui.loader.js',
    'js/ui.progress.js',
    'js/ui.message.js',
    'js/extend/messageDialog.js',
    'js/extend/confirmDialog.js',
    'js/extend/threeBtnDialog.js',
    'js/dialog.js',
    'js/extend/combobox.js',
    'js/extend/ui.multilang.js',
    'js/extend/autocomplete.js',
    'js/extend/ui.combo.js',
    'js/data-table.js',
    'js/extend/ui.pagination.js',
    'js/ui.tooltip.js',
    'js/validate.js',
    'js/extend/ui.refer.js',
    'js/extend/slidePanel.js',
    'js/core/end.js'
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

    var logInfo = '报错文件：' + fileName + '报错类型：' + name + '出错代码位置：' + err.lineNumber + ',' + err.column;

    util.log( err );

    this.end();
}

/**
 * 编译 SASS 文件，并自动添加浏览器前缀
 * @param  {[type]} 'sass-ui' [description]
 * @param  {[type]} (         [description]
 * @return {[type]}           [description]
 */

gulp.task('sass-ui-u-init', function () {

    return gulp.src(['scss/u.scss', 'scss/u-extend.scss'])
        .pipe(concat('u.scss'))
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
    version.init([
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
     version.init([
            'dist/js/u-ui.js',
            'dist/js/u-ui.min.js',
        ]);
})


gulp.task("polyfill-init", function () {
    return gulp.src(polyPath)
            .pipe(concat("neoui-polyfill.js"))
            .pipe(gulp.dest("./dist/js"))
            .pipe(uglify())
            .on('error', errHandle)
            .pipe(concat("neoui-polyfill.min.js"))
            .pipe(gulp.dest("./dist/js"));
});


gulp.task('polyfill', ['polyfill-init'], function(){
     version.init([
            'dist/js/neoui-polyfill.js',
            'dist/js/neoui-polyfill.min.js',
        ]);
})


/**
 * 搬运图标字体，直接复制拷贝
 * @param  {[type]} 'font' [description]
 * @param  {[type]} (      [description]
 * @return {[type]}        [description]
 */
gulp.task('font', function () {
  gulp.src('./vendor/font-awesome/**')
      .pipe(gulp.dest('./dist/fonts/font-awesome'));
  return gulp.src('./fonts/**')
         .pipe(gulp.dest('./dist/fonts'));

});

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


gulp.task('dev', ['image', 'font', 'sass-ui', 'es-ui', 'polyfill', 'serve'])
gulp.task('dist', ['image', 'font', 'sass-ui', 'es-ui', 'polyfill'])
gulp.task('vbuild',['vcss']);



/**
 * [执行重构后dist/css目录输出]
 * 产出map文件,暂时不输出
 */
gulp.task('mapcss', function(){
    gulp.src('./scss/neoui.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dist/css'))
        .pipe(sourcemaps.init())
        .pipe(minifycss())
        .pipe(rename({
            suffix:'.min'
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/css'));
});
gulp.task('mapcssplugin',function(){
    gulp.src('./scss/ui/*.*')
        .pipe(sass())
        .pipe(gulp.dest('./dist/css/plugin'))
        .pipe(sourcemaps.init())
        .pipe(minifycss())
        .pipe(rename({
            suffix:'.min'
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/css/plugin'));
});

/**
 * [执行重构后dist/css目录输出]
 * 不产出map文件
 */
gulp.task('buildcss', function(){
    gulp.src('./scss/neoui.scss')
        .pipe(sass())
        .pipe(base64())
        .pipe(stripCssComments())
        .pipe(gulp.dest('./dist/css'))
        .pipe(minifycss())
        .pipe(rename({
            suffix:'.min'
        }))
        .pipe(gulp.dest('./dist/css'));
});
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

gulp.task('distmap', ['mapcss', 'mapcssplugin']);
gulp.task('distbuild', ['buildcss','buildcssplugin']);

/**
 * 输出合并后的:
 * neoui.css
 * neoui.min.css
 * neoui-polyfill.js
 * neoui-polyfill.min.js
 */
gulp.task('neo',['buildcss','polyfill-init'],function(){
    version.init([
        'dist/js/neoui-polyfill.js',
        'dist/js/neoui-polyfill.min.js',
        'dist/js/neoui.js',
        'dist/js/neoui.min.js'
    ]);    
});
gulp.task('cssvs', ['neo'], function(){
    version.init([
        'dist/css/neoui.css',
        'dist/css/neoui.min.css'
    ]);    
});


/**
 * 输出单独插件
 * 输出目录:./dist/plugin
 * 输出plugin.css & plugin.min.css
 */
gulp.task('neoplugin',['buildcssplugin']);

