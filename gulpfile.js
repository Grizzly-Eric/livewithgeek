var gulp = require('gulp');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');

//压缩JS
gulp.task('build', function() {
  return gulp.src('build.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

// 压缩图片
gulp.task('image',function(){
  return gulp.src('app/images/**')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'));
});

gulp.task('default',['build','image'],function(){
  console.log("gulp压缩成功~")
})
