'use strict';
var gulp = require('gulp');
var args = require('yargs').argv;
var browserSync = require('browser-sync');
var del = require('del');
var config = require('./gulp.config')();
var $ = require('gulp-load-plugins')({lazy: true});
var port = process.env.PORT || config.defaultPort;

gulp.task('help', $.taskListing);

gulp.task('default', ['help']);

gulp.task('vet', function () {
    log('Analyzing source with JSHint and JSCS');

    return gulp
        .src(config.alljs)
        .pipe($.if(args.verbose, $.print()))
        .pipe($.jscs())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
        .pipe($.jshint.reporter('fail'));
});

// DEP => ['clean-styles']
gulp.task('styles', function () {
    log('Compiling SASS ==> CSS');
    return gulp
        .src(config.sass)
        .pipe($.plumber())
        .pipe($.sass())
        .pipe($.autoprefixer({browsers: ['last 2 version', '> 5%']}))
        .pipe(gulp.dest(config.css));
});

// DEP => ['clean-fonts']
gulp.task('fonts', function() {
    log('Copying fonts');

    return gulp
        .src(config.fonts)
        .pipe(gulp.dest(config.build + 'fonts'));
});

// DEP => ['clean-images']
gulp.task('images',  function() {
    log('Copying and compressing the images');

    return gulp
        .src(config.images)
        .pipe($.imagemin({optimizationLevel: 4}))
        .pipe(gulp.dest(config.build + 'images'));
});
gulp.task('html',  function() {
    log('Copying and html');

    return gulp
        .src(config.htmltemplates)
        .pipe(gulp.dest(config.build + 'html'));
});

gulp.task('clean', function(done) {
    var delconfig = [].concat(config.build, config.css);
    log('Cleaning: ' + $.util.colors.blue(delconfig));
    del(delconfig, done);
});

gulp.task('clean-fonts', function(done) {
    clean(config.build + 'fonts/**/*.*', done);
});

gulp.task('clean-images', function(done) {
    clean(config.build + 'images/**/*.*', done);
});

gulp.task('clean-styles', function (done) {
    var files = config.css + '**/*.css';
    clean(files, done);
});

gulp.task('clean-code', function(done) {
    var files = [].concat(
        config.temp + '**/*.js',
        config.build + '**/*.html',
        config.build + 'js/**/*.js'
    );
    clean(files, done);
});

gulp.task('sass-watcher', function () {
    //console.log(config.sass);
   //gulp.watch([config.sass], ['styles']); 
    gulp.watch('./src/scss/**/*.scss', ['styles']);
});



// DEP => ['clean-code']
gulp.task('templatecache',  function() {
    log('Creating AngularJS $templateCache');

    return gulp
        .src(config.htmltemplates)
        .pipe($.minifyHtml({empty: true}))
        .pipe($.angularTemplatecache(
            config.templateCache.file,
            config.templateCache.options
            ))
        .pipe(gulp.dest(config.temp));
});

gulp.task('wiredep', function() {
    log('Wire up the bower css js and our app js into the html');
    var options = config.getWiredepDefaultOptions();
    var wiredep = require('wiredep').stream;

    return gulp
        .src(config.index)
        .pipe(wiredep(options))
        .pipe($.inject(gulp.src(config.js)))
        .pipe(gulp.dest('./'));
});

gulp.task('inject', ['wiredep', 'styles'], function() {
    log('Wire up the custom css js and our app js into the html');

    return gulp
        .src(config.index)
        .pipe($.inject(gulp.src(config.cssfile)))
        .pipe(gulp.dest('./'));
});


gulp.task('optimize', ['inject', 'html', 'images', 'fonts'], function() {
    log('Optimizing the javascript, css, html');

    var assets = $.useref.assets({searchPath: './'});
    //var templateCache = config.temp + config.templateCache.file;
    var cssFilter = $.filter(['**/*.css'], {restore: true});
    var jsLibFilter = $.filter(['**/lib.js'], {restore: true});
    var jsAppFilter = $.filter(['**/app.js'], {restore: true});

    return gulp
        .src(config.index)
        .pipe($.plumber())
        /*.pipe($.inject(gulp.src(templateCache, {read: false}), {
            starttag: '<!-- inject:templates:js -->'
        }))*/
        .pipe(assets)
        .pipe(cssFilter)
        .pipe($.csso())
        .pipe(cssFilter.restore)

        .pipe(jsLibFilter)
        .pipe($.uglify())
        .pipe(jsLibFilter.restore)
    
        .pipe(jsAppFilter)
        .pipe($.ngAnnotate()) // Angualr injection depenecy
        .pipe($.uglify())
        .pipe(jsAppFilter.restore)    
    
        .pipe($.rev()) // app.js --> app.[73gry474].js
        
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe($.revReplace()) // point html to --> app.[73gry474].js
        .pipe(gulp.dest(config.build))
        .pipe($.rev.manifest())
        .pipe(gulp.dest(config.build));
});

/**
 * Bump the version
 * --type=pre will bump the prerelease version *.*.*-x
 * --type=patch or no flag will bump the patch version *.*.x
 * --type=minor will bump the minor version *.x.*
 * --type=major will bump the major version x.*.*
 * --version=1.2.3 will bump to a specific version and ignore other flags
 */

gulp.task('bump', function() {
    var msg = 'Bumping versions';
    var type = args.type;
    var version = args.version;
    var options = {};
    if (version) {
        options.version = version;
        msg += ' to ' + version;
    } else {
        options.type = type;
        msg += ' for a ' + type;
    }
    log(msg);

    return gulp
        .src(config.packages)
        .pipe($.print())
        .pipe($.bump(options))
        .pipe(gulp.dest(config.root));
});

gulp.task('serve-build', ['optimize'], function() {
    serve(false /* isDev */);
});

gulp.task('serve-dev', ['inject'], function() {
    serve(true /* isDev */);
});


//////////////////////////////////////////////////////////////


function serve(isDev) {

    var nodeOptions = {
        script: config.nodeServer,
        delayTime: 1,
        env: {
            'PORT': port,
            'NODE_ENV': isDev ? 'dev' : 'build'
        },
        watch: [config.server]
    };

    return $.nodemon(nodeOptions)
        .on('restart', function(ev) {
            log('*** nodemon restarted');
            log('files changed on restart:\n' + ev);
            setTimeout(function() {
                browserSync.notify('reloading now ...');
                browserSync.reload({stream: false});
            }, config.browserReloadDelay);
        })
        .on('start', function() {
            log('*** nodemon started');
            startBrowserSync(isDev);
        })
        .on('crash', function() {
            log('*** nodemon crashed: script crashed for some reason');
        })
        .on('exit', function() {
            log('*** nodemon exited cleanly');
        });
}


function changeEvent(event) {
    var srcPattern = new RegExp('/.*(?=/' + config.source + ')/');
    log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
}

function startBrowserSync(isDev) {
    if (args.nosync || browserSync.active) {
        return;
    }

    log('Starting browser-sync on port ' + port);

    if (isDev) {

        gulp.watch('./src/scss/**/*.scss', ['styles'])
            .on('change', function(event) { changeEvent(event); });
    } else {
        gulp.watch(['./src/scss/**/*.scss', config.js, config.html], ['optimize', browserSync.reload])
            .on('change', function(event) { changeEvent(event); });
    }
    var options = {
        proxy: 'localhost:' + port,
        port: 3000,
        files: isDev ? [
            './src/**/*.js',
            './css/**/*.css',
            './html/**/*.html'
        ] : [],
        ghostMode: {
            clicks: true,
            location: false,
            forms: true,
            scroll: true
        },
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'debug',
        logPrefix: 'gulp-patterns',
        notify: true,
        reloadDelay: 0 //1000
    };

    browserSync(options);
}

function clean (path, done) {
    log('Cleaning ' + $.util.colors.blue(path));
    del(path, done);
}
function log (msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.green(msg));
    }
}

////////////////////////////////////////////////////////////////