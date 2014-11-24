module.exports = function (grunt) {

    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        /**
         * Sass
         */
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: ['*.scss'],
                    dest: './',
                    ext: '.css'
                }]
            }
        },

        /**
         * Autoprefixer
         */
        autoprefixer: {
            options: {
                browsers: ['last 2 versions', 'ie 8', 'ie 9']
            },
            multiple_files: {
                expand: true,
                flatten: true,
                cwd: '/',
                src: '*.css',
                dest: '/'
            }
        },

        /**
         * Minify JS
         */
        uglify: {
            my_target: {
                files: {
                    'let-it-snow.min.js': ['src/let-it-snow.js']
                }
            }
        },

        /**
         * Watch
         */
        watch: {
            css: {
                files: [
                    'src/*.scss'
                ],
                tasks: ['sass:dist', 'autoprefixer'],
                options: { nospawn: true }
            },
            js: {
                files: [
                    'src/*.js'
                ],
                tasks: ['uglify:my_target'],
                option: { nospawn: true }
            }
        }
    });

    // Load NPM Tasks
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Register Tasks
    grunt.registerTask('default', [ 'sass', 'autoprefixer', 'uglify' ]);
};