"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var mqpacker = require("css-mqpacker");
var minifycss = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var minifyjs = require("gulp-minify");
var htmlmin = require('gulp-html-minifier');
var server = require("browser-sync").create();

gulp.task("style", function() {
  gulp.src("sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({browsers: [
        "last 2 versions"
      ]}),
      mqpacker({
        sort: true
      })
    ]))
    .pipe(gulp.dest("css"))
    .pipe(server.stream());
});

gulp.task("serve", ["style"], function() {
  server.init({
    server: ".",
    notify: true,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("sass/**/*.{scss,sass}", ["style"]);
  gulp.watch("*.html").on("change", server.reload);
});

gulp.task("miniimages", function() {
  gulp.src("img/**/*.{png,jpg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true})
    ]))
    .pipe(gulp.dest("build/img"));
});

gulp.task("minihtml", function() {
  gulp.src("*.html")
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest("build"))
});

gulp.task("minicss", function() {
  gulp.src("css/**/*.css")
    .pipe(minifycss())
    .pipe(gulp.dest("build/css"))
});

gulp.task("minijs", function() {
  gulp.src(["js/**/*.js", "!js/**/*.min.js"])
    .pipe(minifyjs({
      ext:{
        src:".min.js",
        min:".min.js"
      }
  }))
  .pipe(gulp.dest("build/js"))
});

gulp.task("production", ["style"], function() {


});

gulp.task("minify", function() {
  gulp.run(
    "miniimages",
    "minihtml",
    "minijs"
  );
});
