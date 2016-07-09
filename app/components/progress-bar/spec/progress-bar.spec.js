/* eslint max-statements: 0, angular/file-name: 0, max-nested-callbacks: 0 */
import angular  from 'angular';
import module   from '../progress-bar.module';


describe('Component: osm-progress-bar', () => {
  let $componentController;
  let scope;

  beforeEach(angular.mock.module(module));

  beforeEach(inject((_$componentController_, _$rootScope_) => {
    $componentController = _$componentController_;
    scope                = _$rootScope_.$new();
  }));


  it('should define component', () => {
    const instance = $componentController('osmProgressBar', scope);

    expect(instance).toBeDefined();
  });
});
