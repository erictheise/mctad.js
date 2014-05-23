module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    shortname: function() {
      return this.pkg.name.replace('.js','');
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
          'src/core/factorial.js',
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
    watch: {
      js: {
        options: {
          spawn: false,
        },
        files: ['gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
        tasks: ['default']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['concat', 'mochaTest', 'uglify', 'watch']);

};
