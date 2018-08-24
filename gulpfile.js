const gulp = require('gulp');
const autoprefixer = require('autoprefixer');
const $ = require('gulp-load-plugins')();
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const minimist = require('minimist');
const gulpSequence = require('gulp-sequence');

const envOptions = {
  string: 'env',
  default: { env: 'develop' },
};
const options = minimist(process.argv.slice(2), envOptions);
console.log(options);


gulp.task('clean', function () {
  return gulp.src(['./tmp', './public'], { read: false })
    .pipe($.clean());
});


gulp.task('copyHTML', function () {
  return gulp.src('./source/**/*.html')
    .pipe(gulp.dest('./public'))
    .pipe(browserSync.stream());
});


gulp.task('sass', function () {
  const plugins = [
    autoprefixer({ browsers: ['last 1 version'] }),
  ];
  return gulp.src('./source/scss/**/*.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.postcss(plugins))
    .pipe($.if(options.env === 'prod', cleanCSS()))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.reload({
      stream: true,
    }));
});


gulp.task('copyJS', function () {
  return gulp.src('./source/js/**/*.js')
    .pipe($.concat('all.js'))
    .pipe(gulp.dest('./public/js'))
    .pipe(browserSync.stream());
});


gulp.task('copyImgs', function () {
  return gulp.src('./source/imgs/**/*.jpeg')
    .pipe(gulp.dest('./public/imgs'));
});

gulp.task('copyJSON', function () {
  return gulp.src('./source/region.json')
    .pipe(gulp.dest('./public/'));
});


// browserSync use 2.18.8 version
gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: './public',
    },
  });
});


gulp.task('watch', function () {
  gulp.watch('./source/**/*.html', ['copyHTML']);
  gulp.watch('./source/**/*.scss', ['sass']);
  gulp.watch('./source/**/*.js', ['copyJS']);
});


gulp.task('deploy', function () {
  return gulp.src('./public/**/*')
    .pipe($.ghPages());
});


gulp.task('build', gulpSequence('clean', 'copyHTML', 'sass', 'copyJS'));

gulp.task('default', ['copyHTML', 'sass', 'copyJS', 'copyImgs', 'copyJSON', 'browser-sync', 'watch']);
