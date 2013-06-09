var buildConfig = function(name) {
  return require('./build/' + name);
};

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    env: process.env,

    connect: buildConfig('connect'),
    watch: buildConfig('watch'),
    clean: ["tmp"],
    copy: buildConfig('copy'),
    ember_handlebars: buildConfig('ember_handlebars'),
    concat: buildConfig('concat'),
    jshint: buildConfig('jshint'),
    transpile: buildConfig('transpile'),
    qunit: buildConfig('qunit')
  });


  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('test', [
    'build',
    'connect',
    'qunit:all'
  ]);

  grunt.registerTask('build', [
    'clean',
    'ember_handlebars',
    'copy',
    'transpile',
    'jshint',
    'concat'
  ]);

  grunt.registerTask('default', ['build', 'connect', 'watch']);
};
