/* eslint max-statements: 0, angular/file-name: 0, max-nested-callbacks: 0 */
import angular from 'angular';
import decoratorFct from '../ui-grid-options.decorator';

let decoratorFactory = decoratorFct;

if (angular.isArray(decoratorFactory)) {
  decoratorFactory = decoratorFactory[decoratorFactory.length - 1];
}

describe('Decorator: ui-grid-options', () => {
  describe('setDefaultSorting', () => {
    const source     = { initialize: options => options };
    const columnDefs = [{ name: 'first' }, { name: 'another' }];
    let decorator;

    beforeEach(() => {
      decorator = decoratorFactory(source, { ASC: 'foo', DESC: 'bar' });
    });

    it('should not throw if columnDefs or defaultSort are not provided', () => {
      const init = decorator.initialize.bind(decorator, {});

      expect(init).not.toThrow();
    });

    it('should set proper sort options for asc order', () => {
      const { columnDefs: [columnDef] } = decorator.initialize({
        defaultSort: { name: 'first', order: 'asc' },
        columnDefs
      });

      expect(columnDef.sort).toEqual(jasmine.objectContaining({
        direction: 'foo'
      }));
    });

    it('should set proper sort options for desc order', () => {
      const { columnDefs: [columnDef] } = decorator.initialize({
        defaultSort: { name: 'first', order: 'desc' },
        columnDefs
      });

      expect(columnDef.sort).toEqual(jasmine.objectContaining({
        direction: 'bar'
      }));
    });
  });

  describe('initialize', () => {
    const initialize = jasmine.createSpy('initialize').and.callFake(options => options);
    const source     = { initialize };
    let decorator;

    beforeEach(() => {
      decorator = decoratorFactory(source);
    });


    afterEach(() => {
      initialize.calls.reset();
    });

    it('should set enableColumnMenus default value to false', () => {
      const { enableColumnMenus } = decorator.initialize({});

      expect(enableColumnMenus).toBe(false);
    });

    it('should set enableColumnMenus if value is suppressed', () => {
      const { enableColumnMenus } = decorator.initialize({ enableColumnMenus: true });

      expect(enableColumnMenus).toBe(true);
    });
  });
});
