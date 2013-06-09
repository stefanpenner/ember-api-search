module.exports = {
  all: {
    src: [
      'Gruntfile.js',
      'tmp/app/**/*.js',
      'tmp/tests/**.*.js',
      '!tmp/app/templates.js'
    ],
    options: {
      jshintrc: '.jshintrc',
      force: true
    }
  }
};
