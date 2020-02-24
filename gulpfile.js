const gulp = require('gulp');
const {src, dest} = require('gulp');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync');
const cssmin = require('gulp-csso');
const watch = require('gulp-watch');
const htmlmin = require('gulp-htmlmin')

function minifyHtml(){
    return src('./*.html')
        .pipe(htmlmin())
        .pipe(dest('./dist/'))
}

exports.html = minifyHtml;


function style(){
    return src(['./*.scss', './*.css', '!./dist/*'])
        .pipe(sass())
        .pipe(cssmin())
        .pipe(dest('./dist/'))
        .pipe(browserSync.stream())
}

exports.style = style;

function watchFiles(){
    gulp.watch(['./*.scss', './*.css', '!./dist/*'], style);
    gulp.watch(['./media/*.png, ./media/*.jpg'], minifyImages);
    gulp.watch(['./*.html'], minifyHtml)
}

exports.watch = watchFiles;

function minifyImages(){
    gulp.src(['./media/*.jpg', './media/*.png', './media/*.gif'])
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/media/'))
}

exports.images = minifyImages;

function syncBrowser(){
    browserSync.init ({
        server: {
            baseDir: './dist'
        }
    })
    gulp.watch(['./*.scss', './*.css', '!./dist/*'], style);
    gulp.watch(['./*.html', '!./dist/*']).on('change', browserSync.reload);
}

exports.browserSync = syncBrowser;

function defaultTask(){
    syncBrowser();
    watchFiles();
}

exports.default = defaultTask;
