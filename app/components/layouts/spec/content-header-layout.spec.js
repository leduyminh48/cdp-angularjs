/* eslint max-statements: 0, angular/file-name: 0, max-nested-callbacks: 0 */
import angular  from 'angular';
import module   from '../layouts.module';


describe('Component: osm-content-header', () => {
  let $componentController;
  let scope;

  beforeEach(angular.mock.module(module));

  beforeEach(inject((_$componentController_, _$rootScope_) => {
    $componentController = _$componentController_;
    scope                = _$rootScope_.$new();
  }));


  it('should define component', () => {
    const instance = $componentController('osmContentHeader', scope);

    expect(instance).toBeDefined();
  });
});
