/* eslint max-statements: 0, angular/file-name: 0, max-nested-callbacks: 0 */
import angular from 'angular';
import module  from '../view-requests-list.module';


describe('Factory: requestsTableSettingsFct', () => {
  let factory;

  beforeEach(angular.mock.module(module));

  beforeEach(inject(_requestsTableSettingsFct_ => {
    factory = _requestsTableSettingsFct_;
  }));


  it('should define component', () => {
    expect(factory).toBeDefined();
  });


  describe('getDefaultSettings method', () => {
    it('should return object', () => {
      const result = factory.getDefaultSettings();

      expect(result).toEqual(jasmine.any(Object));
    });


    it('should add onRegisterApi', () => {
      const onRegisterApi = () => {};
      const result        = factory.getDefaultSettings({ onRegisterApi });

      expect(result).toEqual(jasmine.objectContaining({ onRegisterApi }));
    });
  });
});
