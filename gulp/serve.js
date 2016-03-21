'use strict'

var gulp = require('gulp')
var browserSync = require('browser-sync')
var nodemon = require('nodemon')

var bs = browserSync.create()

gulp.task('serve', ['browser-sync'], function() {
  gulp.watch('public/app/**/*.js').on('change', bs.reload)
  gulp.watch('public/app/**/*css').on('change', bs.reload)
  gulp.watch('public/app/**/*.tpl.html').on('change', bs.reload)
})

// TODO: check browser sync docs
gulp.task('browser-sync', ['nodemon'], function() {
  bs.init({
    proxy: 'http://localhost:3000',
    port: 4000,
    browser: 'google-chrome'
  })
})

// TODO: check docs
gulp.task('nodemon', [], function (done) {
  let running = false

  return nodemon({
    script: 'index.js',
    watch: ['**/*.js', '**/*.jade', '!node_modules/**/*.*', '!public/**/*.*']
  })
    .on('start', function() {
      if (!running) done()
      running = true
    })
    .on('restart', function() {
      setTimeout(bs.reload, 500)
    })
})