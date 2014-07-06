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

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', ['copy:build']);
}
