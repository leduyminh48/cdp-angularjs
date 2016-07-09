/* eslint max-statements: 0, angular/file-name: 0, max-nested-callbacks: 0 */
import angular  from 'angular';
import module   from '../multiple-select.module';


describe('Component: osm-multiple-select', () => {
  const componentName = 'osmMultipleSelect';
  let $componentController;
  let scope;

  beforeEach(angular.mock.module(module));

  beforeEach(inject((_$componentController_, _$rootScope_) => {
    $componentController = _$componentController_;
    scope                = _$rootScope_.$new();
  }));


  it('should define component', () => {
    const instance = $componentController(componentName, { scope, $attrs: {} });

    expect(instance).toBeDefined();
  });


  describe('Checking groups', () => {
    let instance;

    beforeEach(() => {
      instance = $componentController(componentName, { scope, $attrs: {} });
    });

    it('should check group to be model', () => {
      const result = instance.isModel({ list: null });

      expect(result).toBe(true);
    });

    it('should check group not to be model', () => {
      const result = instance.isModel({ list: [] });

      expect(result).toBe(false);
    });

    it('should not throw while checking not existing group to be a model', () => {
      const isModel = instance.isModel.bind(instance);

      expect(isModel).not.toThrow();
    });

    it('should check group to be a list', () => {
      const result = instance.isList({ list: [] });

      expect(result).toBe(true);
    });

    it('should check group not to be a list', () => {
      const result = instance.isList({ list: null });

      expect(result).toBe(false);
    });

    it('should not throw while checking not existing group to be a list', () => {
      const isList = instance.isList.bind(instance);

      expect(isList).not.toThrow();
    });
  });
  describe('Selecting items', () => {
    let instance;
    let groupAItemA;
    let groupAItemB;
    let groupA;

    let groupBItemA;
    let groupBItemB;
    let groupB;

    let groups;
    const onSelect = jasmine.createSpy('onSelect');

    beforeEach(() => {
      groupAItemA = { title: 'foo' };
      groupAItemB = { title: 'bar' };
      groupA      = { list: [groupAItemA, groupAItemB] };

      groupBItemA = { title: 'oof' };
      groupBItemB = { title: 'rab' };
      groupB      = { list: [groupBItemA, groupBItemB] };
      groups      = [groupA, groupB];

      instance = $componentController(componentName, { scope, $attrs: {} }, {
        titleKey: 'title',
        groups,
        onSelect
      });
    });

    afterEach(() => {
      onSelect.calls.reset();
    });

    it('should select item in the last group properly', () => {
      instance.onDropdownSelect(groupB, groupBItemB);

      expect(groupB.selected).toBe(groupBItemB);
      expect(onSelect).toHaveBeenCalledWith(jasmine.objectContaining({
        groupIndex: 1,
        item      : groupBItemB
      }));
    });

    it('should not select item if it is already selected', () => {
      instance.onDropdownSelect(groupB, groupBItemB);
      instance.onDropdownSelect(groupB, groupBItemB);

      expect(onSelect.calls.count()).toBe(1);
    });

    it('should remove elements after selected if group in the midle was changed', () => {
      instance.onDropdownSelect(groupA, groupAItemA);
      expect(groups.length).toBe(1);
    });
  });
});
