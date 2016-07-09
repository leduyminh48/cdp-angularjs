/* eslint max-statements: 0, angular/file-name: 0, max-nested-callbacks: 0 */
import angular from 'angular';
import module  from '../router.module';


describe('Provider: routerStatusFct', () => {
  let routerStatusFct;

  beforeEach(angular.mock.module(module));

  beforeEach(inject(_routerStatusFct_ => {
    routerStatusFct = _routerStatusFct_;
  }));

  it('should be defined', () => {
    expect(routerStatusFct).toBeDefined();
  });
});
