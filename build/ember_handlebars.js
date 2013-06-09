module.exports = {
  compile: {
    options: {
      processName: function(filename) {
        return filename.replace(/templates\//,'').replace(/\.handlebars$/,'');
      }
    },
    files: {
      "tmp/app/templates.js": "app/templates/**/*.handlebars"
    }
  }
};
