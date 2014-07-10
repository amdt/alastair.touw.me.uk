module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    config: {
      dir: {
        src: 'source',
        dest: 'build',
        bower: 'bower_components'
      }
    },
    copy: {
      build: {
        files: [
          {
            expand: true,
            cwd: '<%= config.dir.src %>/',
            src: ['**', '!stylesheets/**'],
            dest: '<%= config.dir.dest %>/'
          }
        ]
      }
    },
    clean: {
      build: ['<%= config.dir.dest %>']
    },
    watch: {
      build: {
        files: ['<%= config.dir.src %>/**'],
        tasks: ['default']
      }
    },
    connect: {
      server: {
        options: {
          base: '<%= config.dir.dest %>',
          keepalive: true
        }
      },
      develop: {
        options: {
          base: '<%= config.dir.dest %>'
        }
      }
    },
    less: {
      build: {
        options: {
          paths: ['<%= config.dir.bower %>']
        },
        files: {
          '<%= config.dir.dest %>/styles.css': '<%= config.dir.src %>/stylesheets/styles.less'
        }
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', ['copy:build', 'less:build']);
  grunt.registerTask('develop', ['connect:develop', 'watch:build']);
};
