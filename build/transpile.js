module.exports = {
  app: {
    type: "amd",
    moduleName: function(defaultModuleName){
      return 'app/' + defaultModuleName;
    },
    files: [{
      expand: true,
      cwd: 'tmp/app/',
      src: ['**/*.js'],
      dest: 'tmp/app'
    }]
  },

  tests: {
    type: "amd",
    moduleName: function(defaultModuleName){
      return 'test/' + defaultModuleName;
    },
    files: [{
      expand: true,
      cwd: 'tests/',
      src: ['**/*.js', '!fixtures/**'],
      dest: 'tmp/tests'
    }]
  }
};
