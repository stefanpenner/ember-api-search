module.exports = {
  mockApi: {
    files: [
      {
        expand: true,
        cwd: 'mock_api',
        src: ['**'],
        dest: 'tmp/public/api'
      }
    ]
  },
  app: {
    files: [
      {
        expand: true,
        cwd: 'app',
        src: ['**/*.js'],
        dest: 'tmp/app'
      },
      {
        expand: true,
        cwd: 'pages',
        src: ['development.html'],
        dest: 'tmp/public',
        rename: function(dest, src) { return dest + "/index.html"; }
      }
    ]
  },
  test: {
    files: [
      {
        expand: true,
        cwd: 'pages/',
        src: ['tests.html'],
        dest: 'tmp/public'
      }
    ]
  },
  vendor: {
    files: [
      {
        expand: true,
        cwd: 'vendor',
        src: ['**'],
        dest: 'tmp/public/vendor'
      }
    ]
  }
};
