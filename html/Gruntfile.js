module.exports = function(grunt) {
const sass = require('node-sass');

require('load-grunt-tasks')(grunt);
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        copy: {
            main: {
                files: [
                    {expand: true, cwd: './fonts/', src: ['**'], dest: 'dist/fonts'},
                    {expand: true, cwd: 'bower_components/bootstrap-sass/assets/fonts/', src: ['**'], dest: 'dist/fonts'},
                    {expand: true, cwd: './images/', src: ['**'], dest: 'dist/images'},
                ],
            },
        },
        /* grab the Bootstrap js and combine it with my custom scripts
        The goal is to limit the number of http requests to increase load time
         */
        concat: {
            options: {
                stripBanners: false,
                sourceMap: true,
                banner: '',
            },
            scripts: {
                src: ['bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js', 'js/plugins.js', 'js/main.js', 'js/uiact.js'],
                dest: 'dist/js/scripts.js',
            },
        },

        /* Now minify the scripts
        uglify: {
            defer: {
                src: ['js/defer.js'], //input
                dest: 'dist/js/defer.min.js' //output
            },
            scripts: {
                src: ['dist/js/scripts.js'], //input
                dest: 'dist/js/scripts.min.js' //output
            },
        },
        */
        /* Convert the Sass into CSS */
        sass: {
            options: {
                implementation: sass,
                sourceMap: true
            },
            dist: {
                files: {
                    'dist/css/styles.css': 'sass/styles.scss'
                }
            }
        },


        /* Make sure the CSS accounts for browser inconsistency */
        postcss: {
            options: {
                map: true,
                processors: [
                    require('pixrem')(), // add fallbacks for rem units
                    require('autoprefixer')({ browsers: 'last 2 versions' }), // add vendor prefixes
                    require('postcss-flexbugs-fixes'),
                    //require('cssnano')() // minify the result
                ]
            },
            dist: {
                src: 'css/*.css'
            }
        },


        /* Auto Update the scripts and styles when working */
        watch: {
            files: ['sass/*.scss'],
            tasks: ['sass', 'postcss']
        }
    });
    // END GRUNT


    // Load the plugins
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['copy', 'concat', 'sass', 'postcss']);

};