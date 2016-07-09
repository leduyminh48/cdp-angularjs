/* eslint max-statements: 0, angular/file-name: 0, max-nested-callbacks: 0 */
import angular  from 'angular';
import module   from '../request-graph.module';

describe('Component: osm-request-graph', () => {
  let $componentController;
  let instance;

  beforeEach(angular.mock.module(module));

  beforeEach(inject((_$componentController_, _$rootScope_) => {
    $componentController = _$componentController_;
    instance = $componentController('osmRequestGraph', _$rootScope_.$new(), {
      status         : 'green',
      employee       : 'Dyer Zimmerman',
      resourceManager: 'Baird Melton',
      roomOwner      : 'Colon Calhoun',
      place          : 'Kolomenskaya str. 63, 11 floor, Area 11D'
    });
  }));

  it('should be defined', () => {
    expect(instance).toBeDefined();
  });

  it('should have *status* property', () => {
    expect(instance.status).toBe('green');
  });

  it('should have *employee* property', () => {
    expect(instance.employee).toBe('Dyer Zimmerman');
  });

  it('should have *resourceManager* property', () => {
    expect(instance.resourceManager).toBe('Baird Melton');
  });

  it('should have *roomOwner* property', () => {
    expect(instance.roomOwner).toBe('Colon Calhoun');
  });

  it('should have *place* property', () => {
    expect(instance.place).toBe('Kolomenskaya str. 63, 11 floor, Area 11D');
  });
});
