const deps = [
  'angular/angular.min.js',
  'angular-resource/angular-resource.min.js'
];

const depsFull = [
  'babel-polyfill',
  'bootstrap/dist/css/bootstrap.min.css',
  'angular-ui-router',
  'angular-ui-bootstrap',
  'angular-toastr',
  'angular-ui-grid/ui-grid.min',
  'angular-ui-grid/ui-grid.min.css'
];

module.exports = deps.map(dep => dep.split('/')[0]).concat(depsFull);
