import angular from 'angular';
import module  from '../filters.module';


describe('Filters: capitalize', () => {
  let capitalizeFilter;

  beforeEach(angular.mock.module(module));


  beforeEach(inject(_capitalizeFilter_ => {
    capitalizeFilter = _capitalizeFilter_;
  }));

  it('should capitilize strings', () => {
    const result = capitalizeFilter('some String');

    expect(result).toBe('Some String');
  });

  it('should not throw for an empty value', () => {
    const caller = capitalizeFilter.bind(null, '');

    expect(caller).not.toThrow();
  });
});
