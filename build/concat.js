var publicDir = function(file) {
  return 'tmp/public/' + file;
};

var vendorOrdering = {
  javascripts: [
    publicDir('vendor/javascripts/jquery*.js'),
    publicDir('vendor/javascripts/handlebars*.js'),
    publicDir('vendor/javascripts/ember*.js'),
    publicDir('vendor/javascripts/**/*.js')
  ],

  stylesheets: [
    publicDir('vendor/stylesheets/normalize.css'),
    publicDir('vendor/stylesheets/**/*.css')
  ]
};

var vendor = {
  development: {
    javascripts: {
      src: vendorOrdering.javascripts
        .concat('!tmp/public/vendor/javascripts/qunit*'),
      dest: publicDir('vendor-development-bundle.js')
    },
    stylesheets: {
      src: vendorOrdering.stylesheets
        .concat('!tmp/public/vendor/stylesheets/qunit*'),
      dest: publicDir('vendor-development-bundle.css')
    }
  },

  test: {
    javascripts: {
      src: vendorOrdering.javascripts,
      dest: publicDir('vendor-test-bundle.js')
    },
    stylesheets: {
      src: vendorOrdering.stylesheets,
      dest: publicDir('vendor-test-bundle.css')
    }
  }
};

var app = {
  production: {
    // only concat app files
    javascripts: {
      src: ['tmp/app/templates.js', 'tmp/app/**/*.js'],
      dest: publicDir('app.js')
    },
    stylesheets: {
      src: ['tmp/app/**/*.css'],
      dest: publicDir('app.css')
    }
  },

  development: {
    // vendor + app
    javascripts: {
      src: [
        publicDir('vendor-development-bundle.js'),
        publicDir('app.js')
      ],
      dest: publicDir('app-development-bundle.js')
    },
    stylesheets: {
      src: [
        publicDir('vendor-development-bundle.css'),
        publicDir('app.css')
      ],
      dest: publicDir('app-development-bundle.css')
    }
  },

  test: {
    // vendor + app + tests
    javascripts: {
      src: [
        publicDir('vendor-test-bundle.js'),
        publicDir('app.js'),
        'tmp/tests/**/*.js'
      ],
      dest: publicDir('app-test-bundle.js')
    },
    stylesheets: {
      src: [
        publicDir('vendor-test-bundle.css'),
        publicDir('app.css'),
        'tmp/tests/**/*/css'
      ],
      dest: publicDir('app-test-bundle.css')
    }
  }
};

module.exports = {
  vendorDevelopmentJavascripts: vendor.development.javascripts,
  vendorDevelopmentStylesheets: vendor.development.stylesheets,
  vendorTestJavascripts: vendor.test.javascripts,
  vendorTestStylesheets: vendor.test.stylesheets,
  appProductionJavascripts: app.production.javascripts,
  appProductionStylesheets: app.production.stylesheets,
  appDevelopmentJavascripts: app.development.javascripts,
  appDevelopmentStylesheetes: app.development.stylesheets,
  appTestJavascripts: app.test.javascripts,
  appTestStylesheets: app.test.stylesheets
};
