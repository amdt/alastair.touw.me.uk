module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    config: {
      dir: {
        src: 'source',
        dest: 'build'
      }
    },
    copy: {
      build: {
        files: [
          {
            expand: true,
            cwd: '<%= config.dir.src %>/',
            src: ['**'],
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
        tasks: ['copy:build']
      }
    },
    connect: {
      server: {
        options: {
          base: '<%= config.dir.dest %>',
          keepalive: true
        }
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', ['copy:build']);
}
