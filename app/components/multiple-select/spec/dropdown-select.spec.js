/* eslint max-statements: 0, angular/file-name: 0, max-nested-callbacks: 0 */
import angular  from 'angular';
import module   from '../multiple-select.module';


describe('Component: osm-dropdown-select', () => {
  let $componentController;

  beforeEach(angular.mock.module(module));

  beforeEach(inject(_$componentController_ => {
    $componentController = _$componentController_;
  }));


  it('should define component', () => {
    const instance = $componentController('osmDropdownSelect');

    expect(instance).toBeDefined();
  });


  describe('Handlers', () => {
    const onSelect = jasmine.createSpy('onSelect');
    let instance;

    beforeEach(() => {
      instance = $componentController('osmDropdownSelect', null, {
        list    : [],
        selected: {},
        titleKey: 'foo',
        onSelect
      });
    });

    afterEach(() => {
      onSelect.calls.reset();
    });


    it('should call on select handler on click', () => {
      const item = { foo: 'bar' };

      instance.onClick(item);
      expect(onSelect).toHaveBeenCalledWith({ item });
    });


    it('should call on select handler on enter key press', () => {
      const item = { foo: 'bar' };

      instance.onKeypress(item, { which: 13 });
      expect(onSelect).toHaveBeenCalledWith({ item });
    });


    it('should not call on select handler on not enter key press', () => {
      const item = { foo: 'bar' };

      instance.onKeypress(item, { which: 27 });
      expect(onSelect).not.toHaveBeenCalled();
    });
  });


  describe('Default text', () => {
    it('should show title for a selected item if any', () => {
      const instance = $componentController('osmDropdownSelect', null, {
        titleKey: 'foo',
        selected: { foo: 'bar' }
      });
      const result   = instance.getSelectedText();

      expect(result).toEqual('bar');
    });


    it('should show default empty text if any', () => {
      const instance = $componentController('osmDropdownSelect', null, {
        emptyText: 'foo-bar'
      });
      const result   = instance.getSelectedText();

      expect(result).toEqual('foo-bar');
    });


    it('should show some hard-coded text', () => {
      const instance = $componentController('osmDropdownSelect');
      const result   = instance.getSelectedText();

      expect(result).toEqual('Please select');
    });
  });
});
