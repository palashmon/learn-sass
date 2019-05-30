const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const stripCssComments = require('gulp-strip-css-comments');

// Compile Sass & Inject Into Browser
gulp.task('sass', function() {
  return (
    gulp
      .src(['src/scss/*.scss'])

      // For learning purpose we are using expanded
      .pipe(sass({ outputStyle: 'expanded' }))
      .pipe(
        autoprefixer({
          browsers: ['last 2 versions'],
          cascade: false
        })
      )
      .pipe(stripCssComments())
      .pipe(gulp.dest('src/css'))
      .pipe(browserSync.stream())
  );
});

// Watch Sass & Serve
gulp.task(
  'serve',
  gulp.series('sass', function() {
    browserSync.init({
      server: './src'
    });

    gulp.watch(['src/scss/*.scss'], gulp.series('sass'));
    gulp.watch('src/*.html').on('change', browserSync.reload);
  })
);

// Default Task
gulp.task('default', gulp.series('serve'));
