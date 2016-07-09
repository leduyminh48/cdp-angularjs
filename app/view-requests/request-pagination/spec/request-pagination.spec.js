/* eslint max-statements: 0, angular/file-name: 0, max-nested-callbacks: 0 */
import angular  from 'angular';
import module   from '../request-pagination.module';

describe('Component: osm-request-pagination', () => {
  let $componentController;
  let instance;

  beforeEach(angular.mock.module(module));

  beforeEach(inject((_$componentController_, _$rootScope_) => {
    $componentController = _$componentController_;
    instance = $componentController('osmRequestPagination', _$rootScope_.$new(), {
      perPage         : 5,
      currentPage     : 4,
      totalPagesAmount: 5,
      movePagination  : angular.noop
    });
  }));

  it('should define component', () => {
    expect(instance).toBeDefined();
  });

  it('component should have *perPage* property', () => {
    expect(instance.perPage).toBe(5);
  });

  it('component should have *currentPage* property', () => {
    expect(instance.currentPage).toBe(4);
  });

  it('component should have *totalPagesAmount* property', () => {
    expect(instance.totalPagesAmount).toBe(5);
  });

  it('component should have *movePagination* property', () => {
    expect(instance.movePagination).toEqual(jasmine.any(Function));
  });
});
