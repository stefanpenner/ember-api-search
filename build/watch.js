module.exports = {
  scripts: {
    files: ['app/**', 'pages/**', 'vendor/**', 'tests/**', 'mock_api/**'],
    tasks: ['build', 'qunit:all'],
    //tasks: ['lock', 'build', 'unlock', 'jshint', 'qunit:all'],
    options: {
      //nospawn: true
    }
  }
};
