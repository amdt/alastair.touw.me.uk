module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    config: {
      dir: {
        src: 'source',
        dest: 'build',
        bower: 'bower_components',
        tmp: '.temporary'
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
      build: ['<%= config.dir.dest %>', '<%= config.dir.tmp %>'],
      temporary: ['<%= config.dir.tmp %>']
    },
    watch: {
      develop: {
        files: ['<%= config.dir.src %>/**'],
        tasks: ['build']
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
          paths: ['<%= config.dir.bower %>'],
          customFunctions: {
            'image-url': function(less, path, imgPath) {
              imgPath = imgPath || "/images/";

              return "url('" + imgPath + path.value + "')";
            }
          }
        },
        files: {
          '<%= config.dir.tmp %>/styles.css': '<%= config.dir.src %>/stylesheets/styles.less'
        }
      }
    },
    autoprefixer: {
      build: {
        src: '<%= config.dir.tmp %>/styles.css',
        dest: '<%= config.dir.dest %>/styles.css'
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', ['build', 'clean:temporary']);
  grunt.registerTask('build', ['copy:build', 'less:build', 'autoprefixer:build']);
  grunt.registerTask('develop', ['connect:develop', 'watch:develop']);
};
