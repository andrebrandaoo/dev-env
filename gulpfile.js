const gulp = require('gulp')
const clear = require('clear')
const connect = require('gulp-connect')
const pug = require('gulp-pug')
const stylus = require('gulp-stylus')
const uglifycss = require('gulp-uglifycss')
const concat = require('gulp-concat')
const sourcemaps = require('gulp-sourcemaps')
const rename = require('gulp-rename')

gulp.task('clear', () => {
  return clear()
})

gulp.task('server', () => {
  return connect.server({
    root: 'dist',
    port: 8080
  })
})

gulp.task('pug', () => {
  return gulp.src('./src/views/*.pug')
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest('./dist'))
})

gulp.task('css', () => {
  return gulp.src([
    './node_modules/animate.css/animate.min.css',
  ])
  .pipe(concat('vendor.min.css'))
  .pipe(gulp.dest('./dist/assets/styles'))
})

gulp.task('styles', () => {
  return gulp.src('./src/assets/styles/main.styl')
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(uglifycss())
    .pipe(sourcemaps.write())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist/assets/styles'))
})

gulp.task('scripts', () => {
  return gulp.src([
    './node_modules/jquery/dist/jquery.min.js',
    './node_modules/wow.js/dist/wow.min.js',
    './src/assets/js/app.js'
  ])
  .pipe(concat('app.js'))
  .pipe(gulp.dest('./dist/assets/js'))
})

gulp.task('fonts', () => {
  return gulp.src('./src/assets/fonts/**/*.{eot,svg,ttf,woff,otf}')
    .pipe(gulp.dest('./dist/assets/fonts'))
})

gulp.task('images', () => {
  return gulp.src('./src/assets/images/**/*.{gif,jpg,png,svg,jpeg}')
    .pipe(gulp.dest('./dist/assets/images'))
})

gulp.task('build', ['pug', 'css', 'styles', 'scripts', 'images', 'fonts'])

gulp.task('watch', ['clear', 'build', 'server'], () => {
  gulp.watch('./src/**/*.pug', ['pug'])
  gulp.watch('./src/assets/styles/**/*.styl', ['styles'])
  gulp.watch('./src/assets/js/app.js', ['scripts'])
})
