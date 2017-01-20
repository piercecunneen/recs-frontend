var common = require('./common.json');
var development = require('./development.json');
var production = require('./production.json');


var Config = function() {
  /* eslint-disable no-undef */
  var env_variables = process.env;
  /* eslint-disable no-undef */
  this.options = common;
  var deployment_options;
  if (env_variables.myRecsDeployment === "production") {
    deployment_options = production;
  } else {
    deployment_options = development;
  }
  for (var key in deployment_options) {
    this.options[key] = deployment_options[key];
  }
};

module.exports = new Config();