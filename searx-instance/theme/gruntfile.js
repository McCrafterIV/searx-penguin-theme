/*jshint esversion: 6 */
module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            js: {
                expand: true,
                cwd: './node_modules',
                dest: './js/',
                flatten: true,
                filter: 'isFile',
                timestamp: true,
                src: [
                    './jquery/dist/jquery.min.js',
                    './leaflet/dist/leaflet.js',
                ]
            },
            css: {
                expand: true,
                cwd: './node_modules',
                dest: './css/',
                flatten: true,
                filter: 'isFile',
                timestamp: true,
                src: [
                    './leaflet/dist/leaflet.css',
                ]
            },
            icons: {
                expand: true,
                cwd: './node_modules',
                dest: './img/icons/',
                flatten: true,
                filter: 'isFile',
                timestamp: true,
                src: [
                    './feather-icons/dist/feather-sprite.svg',
                ]
            },
            leaflet_images: {
                expand: true,
                cwd: './node_modules',
                dest: './css/images/',
                flatten: true,
                filter: 'isFile',
                timestamp: true,
                src: [
                    './leaflet/dist/images/*.png',
                ]
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['src/js/*.js'],
                dest: 'js/searx.js'
            }
        },
        uglify: {
            options: {
                sourceMap: true,
                banner: '/*! oscar/searx.js | <%= grunt.template.today("dd-mm-yyyy") %> | <%= process.env.GIT_URL %>  */\n'
            },
            dist: {
                files: {
                    'js/searx.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        sass: {
            development: {
                options: {
                    loadPath: ["src/sass", "node_modules/bulma/bulma.sass"]
                },
                files: {
                    "css/penguin-light.min.css": "src/sass/light/penguin.sass",
                    "css/penguin-dark.min.css": "src/sass/dark/penguin.sass",
                }
            }
        },
        watch: {
            scripts: {
                files: ['src/js/**.js'],
                tasks: ['concat', 'uglify']
            },
            penguin_styles: {
                files: ['src/sass/**/*.sass'],
                tasks: ['sass']
            },
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.registerTask('default', ['copy', 'concat', 'uglify', 'sass']);

    grunt.registerTask('styles', ['sass']);

};
