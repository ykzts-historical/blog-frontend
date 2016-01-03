import babelify from 'babelify';
import browserify from 'browserify';
import gulp from 'gulp';
import eslint from 'gulp-eslint';
import nodemon from 'gulp-nodemon';
import buffer from 'vinyl-buffer';
import source from 'vinyl-source-stream';

gulp.task('lint', function() {
  gulp.src('./src/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('build', ['build:client']);

gulp.task('build:client', ['lint'], function() {
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

gulp.task('watch', ['build:client'], function() {
  gulp.watch('./src/**/*.js', ['build:client']);
});

gulp.task('dev', function() {
  nodemon({
    script: './start.js',
    ext: 'js',
    tasks: ['lint']
  });
});
