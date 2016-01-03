import autoprefixer from 'autoprefixer';
import babelify from 'babelify';
import browserify from 'browserify';
import gulp from 'gulp';
import eslint from 'gulp-eslint';
import nodemon from 'gulp-nodemon';
import postcss from 'gulp-postcss';
import postcssImport from 'postcss-import';
import buffer from 'vinyl-buffer';
import source from 'vinyl-source-stream';

gulp.task('lint', function() {
  gulp.src('./src/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('build', ['build:script', 'bundle:style']);

gulp.task('build:script', ['lint'], function() {
  browserify({
    entries: ['./src/client.js'],
    debug: true
  })
    .transform(babelify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./public'));
});

gulp.task('build:style', function() {
  gulp.src('./assets/styles/bundle.css')
    .pipe(postcss([postcssImport, autoprefixer]))
    .pipe(gulp.dest('./public'))
});

gulp.task('watch', ['build:script', 'build:style'], function() {
  gulp.watch('./src/**/*.js', ['build:script']);
  gulp.watch('./assets/styles/**/*.css', ['build:style']);
});

gulp.task('dev', function() {
  nodemon({
    script: './start.js',
    ext: 'js',
    tasks: ['lint']
  });
});
