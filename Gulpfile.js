var gulp = require('gulp'),
    eslint = require('gulp-eslint');


gulp.task('lint', function () {
  return gulp.src('src/**/*.{js,jsx}')
    .pipe(eslint({
      useEslintrc: true
    }))
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});


gulp.task('default', ['lint'], function () { });
