module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    shortname: function() {
      return this.pkg.name.replace('.js','');
    },
    jshint: {
      all: ['gruntfile.js', 'src/**/*.js', 'test/**/*.js']
    },
    concat: {
      options: {
        stripBanners: true,
        separator: ';\n'
      },
      dist: {
        src: [
          'src/core/core.js',
          'src/core/constants.js',
          'src/core/helpers.js',
          'src/core/factorial.js',
          'src/statistics/*.js',
          'src/discrete/mixins.js',
          'src/discrete/*.js',
          'src/continuous/*.js'
        ],
        dest: './<%= shortname() %>.js'
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          clearRequireCache: true
        },
        src: ['test/**/*.js']
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= shortname() %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      dist: {
        files: {
          './<%= shortname() %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    groc: {
      javascript: [
        'src/**/*.js', 'README.md'
      ],
      options: {
        "out": "doc/"
      }
    },
    watch: {
      js: {
        options: {
          spawn: false
        },
        files: ['gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
        tasks: ['default']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-groc');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'concat', 'mochaTest', 'uglify', 'groc', 'watch']);

};
