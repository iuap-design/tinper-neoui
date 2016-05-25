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

const UISassSrcPath = [
  'src/ui/u.scss',
  'src/ui-extend/u-extend.scss'
]

const gridSassSrcPath = 'src/ui/grid/grid.css'
const treeSassSrcPath = 'src/ui/tree/tree.css'

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
  'src/polyfill/core.js',
  'src/polyfill/JsExtensions.js'
]

const gridSrcPath = [
  'src/ui/grid/gridComp.js',
  'src/ui/grid/ColumnMenu.js',
  'src/ui/grid/Drag.js',
  'src/ui/grid/Edit.js',
  'src/ui/grid/EditForm.js',
  'src/ui/grid/Fixed.js',
  'src/ui/grid/FormShow.js',
  'src/ui/grid/HeaderLevel.js',
  'src/ui/grid/OverWidthHidden.js',
  'src/ui/grid/Sort.js',
  'src/ui/grid/SumRow.js',
  'src/ui/grid/Swap.js',
  'src/ui/grid/Tree.js',
  // 'src/model/comp-adp/grid.js'
]

const treeSrcPath = [
  'src/ui/tree/treeComp.js',
  // 'src/model/comp-adp/tree.js'
]

// 公共错误处理函数
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
    出错代码位置：${loc.line},${loc.column}
    报错信息：${message}`);

  // this.end();
}

gulp.task('sass:ui', () => {
  return gulp.src( UISassSrcPath )
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task("es:ui", () => {
  return gulp.src( UISrcPath )
    .pipe(sourcemaps.init())
    .pipe(babel())
    .on('error', errHandle)
    .pipe(concat("u.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist/js"));
});

gulp.task('font', () => {
  gulp.src('./font-awesome/**')
    .pipe(copy('./dist'));
});

gulp.task('serve', () => {
    // static server
    browserSync({
        files: ['src/*.js', 'dist'],
        server: {
            baseDir: "./"
        }
    });

    // watch task
    gulp.watch('./src/**/*.scss', ['sass']);
    gulp.watch('./src/**/*.js', ['es2015']);

});

gulp.task('clean', () => {
  gulp.src('dist/*', { read: false })
    .pipe(clean({ force: true }));
});

gulp.task('before', ['clean', 'font', 'sass:ui', 'es:ui'])
gulp.task('default', ['before', 'serve'])
