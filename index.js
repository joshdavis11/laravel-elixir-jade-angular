var Elixir = require('laravel-elixir');
var gulp = require('gulp');
var jade = require('gulp-jade');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var _ = require('underscore');

/*
 |----------------------------------------------------------------
 | Gulp Jade Wrapper
 |----------------------------------------------------------------
 |
 | This task will compile your Jade files into your views folder.
 | You can make use of Blade variables in your jade files as well.
 | Examples see README.md
 |
 */

Elixir.extend('jade', function (options) {

    options = _.extend({
        baseDir: './resources',
        dest: '/views/',
        pretty: false,
        search: '**/*.jade',
        src: '/jade/',
        extension: '.html'
    }, options);

    var gulp_src = options.baseDir + options.src + options.search;

    var jade_options = _.pick(
        options,
        'filename',
        'doctype',
        'pretty',
        'self',
        'debug',
        'compileDebug',
        'compiler'
    );

    new Elixir.Task('jade', function () {
        return (gulp.src([gulp_src])
            .pipe(plumber())
            .pipe(jade(jade_options))
            .pipe(rename(function (path) {
                path.extname = options.extension;
            }))
            .pipe(gulp.dest(options.baseDir + options.dest))
            .pipe(notify({
                title: 'Laravel Elixir',
                message: 'Jade templates compiled',
                icon: __dirname + '/../laravel-elixir/icons/pass.png',
                onLast: true
            }))
        );
    })
    .watch(gulp_src)
    .ignore(options.baseDir + options.dest);
});
