'use strict';
var root = './';
var css = './css/';
var src = './src/';
var server = './src/server/';

module.exports = function () {
    var config = {
       
        /**
        *	Files paths
        */
        alljs: [
            './src/**/*.js',
            './*.js'
        ],
        build: './build/',
        index: 'index.html',
        fonts: './bower_components/font-awesome/fonts/**/*.*',
        html: './html/**/*.html',
        htmltemplates: './html/**/*.html',
        images: './images/**/*.*',
        src: src,
        js: ['src/js/**/*.js'],
        sass: './src/scss/**/*.scss/',
        server: server,
        temp: './.tmp/',
        css: css,
        cssfile: css + 'styles.css/',
        /**
         * template cache
         */
        templateCache: {
            file: 'templates.js',
            options: {
                module: 'app.js',
                standAlone: false,
                root: 'html/'
            }
        },
         /**
         * Browser sync
         */
        browserReloadDelay: 2000,
        /**
         * Bower and NPM locations
         */
        bower: {
            json: require('./bower.json'),
            directory: './bower_components/',
            ignorePath: '../..'
        },
        packages : [
            './package.json',
            './bower.json'
        ],
        root: root,

        /**
         * Node settings
         */
        defaultPort: 7203,
        nodeServer: './src/server/app.js'
        
    };
    
    config.getWiredepDefaultOptions = function() {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };
        return options;
    };
    
    return config;
};
