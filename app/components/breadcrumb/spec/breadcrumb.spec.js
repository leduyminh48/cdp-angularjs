/* eslint max-statements: 0, angular/file-name: 0, max-nested-callbacks: 0 */
import angular  from 'angular';
import module   from '../breadcrumb.module';


describe('Component: osm-breadcrumb', () => {
  let $componentController;
  let instance;

  beforeEach(angular.mock.module(module));

  beforeEach(inject((_$componentController_, _$rootScope_) => {
    $componentController = _$componentController_;
    instance = $componentController('osmBreadcrumb', _$rootScope_.$new(), {
      breadcrumbItems: ['Home', 'Contacts'],
      delimiterType: 'arrow-left-solid'
    });
  }));

  it('should define component', () => {
    expect(instance).toBeDefined();
  });

  it('component should have *delimiterType* property', () => {
    expect(instance.delimiterType).toBeDefined();
    expect(instance.delimiterType).toBe('arrow-left-solid');
  });

  it('component should have *breadcrumbItems* property', () => {
    expect(instance.breadcrumbItems).toBeDefined();
    expect(instance.breadcrumbItems[0]).toBe('Home');
  });
});
