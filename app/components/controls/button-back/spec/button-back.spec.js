import angular  from 'angular';
import module   from '../button-back.module';

describe('Component: osm-button-back', () => {
  let scope;
  let element;
  let $windowMock;

  beforeEach(angular.mock.module(module, $provide => {
    $windowMock = {
      history: {
        back: jasmine.createSpy()
      }
    };
    $provide.factory('$window', () => $windowMock);
  }));

  beforeEach(inject((_$rootScope_, $compile) => {
    scope = _$rootScope_.$new();
    element = angular.element('<osm-button-back></osm-button-back>');
    $compile(element)(scope);
    scope.$apply();
  }));

  it('should be defined', () => {
    expect(element).toBeDefined();
  });

  it('should go back in history on click', () => {
    element.find('button').eq(0).triggerHandler('click');
    expect($windowMock.history.back).toHaveBeenCalled();
  });
});
