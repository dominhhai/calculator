module.exports = function (grunt) {
  grunt.initConfig({
    // pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['Gruntfile.js', '/*.js', 'test/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-jshint')

  grunt.registerTask('default', ['jshint'])

  grunt.registerTask('custom', 'Log some stuff.', function () {
    grunt.log.write('Logging some stuff...').ok()
  })
}
