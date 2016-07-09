import angular from 'angular';
import module  from '../filters.module';


describe('Filters: markdown', () => {
  let markdownFilter;

  beforeEach(angular.mock.module(module));


  beforeEach(inject(_markdownFilter_ => {
    markdownFilter = _markdownFilter_;
  }));

  it('should pass strings without markdown', () => {
    const result = markdownFilter('some * string');

    expect(result).toBe('some * string');
  });

  it('should process bold strings with **', () => {
    const result = markdownFilter('some **string**');

    expect(result).toBe('some <b>string</b>');
  });

  it('should process bold strings with __', () => {
    const result = markdownFilter('some __string__');

    expect(result).toBe('some <b>string</b>');
  });

  it('should process italic strings with *', () => {
    const result = markdownFilter('some *string*');

    expect(result).toBe('some <i>string</i>');
  });

  it('should process italic strings with _', () => {
    const result = markdownFilter('some _string_');

    expect(result).toBe('some <i>string</i>');
  });

  it('should process bold italic strings with __*', () => {
    const result = markdownFilter('some __*string*__');

    expect(result).toBe('some <b><i>string</i></b>');
  });

  it('should process bold italic strings with **_', () => {
    const result = markdownFilter('some **_string_**');

    expect(result).toBe('some <b><i>string</i></b>');
  });

  it('should process bold italic strings with *__', () => {
    const result = markdownFilter('some *__string__*');

    expect(result).toBe('some <i><b>string</b></i>');
  });

  it('should process bold italic strings with _**', () => {
    const result = markdownFilter('some _**string**_');

    expect(result).toBe('some <i><b>string</b></i>');
  });

  it('should not throw for an empty value', () => {
    const caller = markdownFilter.bind(null, '');

    expect(caller).not.toThrow();
  });
});
