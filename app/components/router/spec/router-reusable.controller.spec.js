/* eslint max-statements: 0, angular/file-name: 0, max-nested-callbacks: 0 */
import angular    from 'angular';
import module     from '../router.module';
import Controller from '../router-reusable.controller';


describe('Mixin: RouterReusableCtrl', () => {
  let $rootScope;
  let $scope;
  let instance;

  beforeEach(angular.mock.module(module, $provide => {
    $provide.constant('$state', { current: { name: 'foo-bar' } });
  }));

  beforeEach(inject((_$injector_, _$rootScope_) => {
    $rootScope = _$rootScope_;
    $scope     = $rootScope.$new();
    instance   = new Controller(_$injector_, $scope);
    spyOn(instance, '$routerOnReuse');
  }));


  it('should be defined', () => {
    expect(instance).toBeDefined();
  });


  it('should call $routerOnReuse on $stateChangeStart event with the same name of new state', () => {
    $rootScope.$broadcast('$stateChangeSuccess', { name: 'foo-bar' }, {}, { name: 'foo-bar' });
    expect(instance.$routerOnReuse).toHaveBeenCalled();
  });


  it('should not call $routerOnReuse on $stateChangeStart event with new name of new state', () => {
    $rootScope.$broadcast('$stateChangeSuccess', { name: 'bar-foo' }, {}, { name: 'foo-bar' });
    expect(instance.$routerOnReuse).not.toHaveBeenCalled();
  });


  it('should not be called after scope was destroyed', () => {
    $scope.$destroy();

    $rootScope.$broadcast('$stateChangeSuccess', { name: 'foo-bar' }, {}, { name: 'foo-bar' });
    expect(instance.$routerOnReuse).not.toHaveBeenCalled();
  });
});
