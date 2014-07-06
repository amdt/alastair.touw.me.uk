module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      build: {
        files: [
          {
            expand: true,
            cwd: 'source/',
            src: ['**'],
            dest: 'build/'
          }
        ]
      }
    },
    clean: {
      build: ['build']
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', ['copy:build']);
}
