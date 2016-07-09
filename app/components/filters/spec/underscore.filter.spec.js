import angular from 'angular';
import module  from '../filters.module';


describe('Filters: underscore', () => {
  let filter;

  beforeEach(angular.mock.module(module));


  beforeEach(inject(_underscoreFilter_ => {
    filter = _underscoreFilter_;
  }));

  it('should underscore strings with spaces', () => {
    const result = filter('some long string');

    expect(result).toBe('some_long_string');
  });

  it('should not underscore strings without spaces', () => {
    const result = filter('some-long-string');

    expect(result).toBe('some-long-string');
  });

  it('should not throw for an empty value', () => {
    const caller = filter.bind(null, '');

    expect(caller).not.toThrow();
  });
});
