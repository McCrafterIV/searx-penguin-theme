/*jshint esversion: 6 */
module.exports = function(grunt) {

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
          './corejs-typeahead/dist/typeahead.bundle.min.js',
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
          './bulma/css/bulma.min.css',
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
        src: ['src/js/*.js', '../__common__/js/image_layout.js'],
        dest: 'js/searx.js'
      }
    },
    uglify: {
      options: {
        sourceMap: true,
        banner: '/*! oscar/searx.min.js | <%= grunt.template.today("dd-mm-yyyy") %> | <%= process.env.GIT_URL %>  */\n'
      },
      dist: {
        files: {
          'js/searx.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    jshint: {
      files: ['gruntfile.js', 'js/searx_src/*.js', '../__common__/js/image_layout.js'],
      options: {
        reporterOutput: "",
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    less: {
      development: {
        options: {
          paths: ["src/less"]
        },
        files: {
          "css/penguin-light.css": "src/less/light/penguin.less",
          "css/penguin-dark.css": "src/less/dark/penguin.less",
        }
      },
      production: {
        options: {
          paths: ["src/less"],
          plugins: [
            new (require('less-plugin-clean-css'))()
          ],
          sourceMap: true,
          sourceMapURL: (name) => { const s = name.split('/'); return s[s.length - 1] + '.map';},
          outputSourceFiles: false,
          sourceMapRootpath: '../'
        },
        files: {
          "css/leaflet.min.css": "css/leaflet.css",
          "css/penguin-light.min.css": "src/less/light/penguin.less",
          "css/penguin-dark.min.css": "src/less/dark/penguin.less",
        }
      },
    },
    watch: {
        scripts: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint', 'concat', 'uglify']
        },
        penguin_styles: {
            files: ['src/less/light/**/*.less', 'src/less/dark/**/*.less'],
            tasks: ['less:development', 'less:production']
        },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.registerTask('test', ['jshint']);

  grunt.registerTask('default', ['copy', 'jshint', 'concat', 'uglify', 'less']);

  grunt.registerTask('styles', ['less']);

};
