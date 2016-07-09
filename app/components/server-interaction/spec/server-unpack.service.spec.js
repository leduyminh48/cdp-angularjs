/* eslint max-statements: 0, angular/file-name: 0, max-nested-callbacks: 0 */
import angular      from 'angular';
import serverModule from '../server-interaction.module';


describe('Factory: interceptor unpackInterceptorFct', () => {
  let unpackInterceptorFct;
  let $httpProviderIt;
  let $rootScope;
  const toastr          = {
    error: jasmine.createSpy('error')
  };
  const errorMessage = jasmine.createSpy('errorMessageFct').and.returnValue('Alarm!');

  beforeEach(angular.mock.module(serverModule, ($httpProvider, $provide) => {
    $provide.constant('toastr', toastr);
    $provide.constant('errorMessageFct', errorMessage);
    $httpProviderIt = $httpProvider;
  }));

  beforeEach(inject((_$rootScope_, _unpackInterceptorFct_) => {
    unpackInterceptorFct = _unpackInterceptorFct_;
    $rootScope           = _$rootScope_;
  }));

  it('should unpack data', () => {
    const data   = 'foo-bar';
    const config = {
      data: {
        data
      }
    };

    unpackInterceptorFct.response(config);
    expect(config.data).toBe(data);
  });

  describe('Unpack error', () => {
    let config;
    let result;

    beforeEach(() => {
      config = {
        data: {
          error: 'Ahtung!'
        }
      };

      result = unpackInterceptorFct.response(config);
    });

    it('should call translation filter', () => {
      expect(errorMessage).toHaveBeenCalledWith('ERR_SERVER', { text: 'Ahtung!' });
    });

    it('should show toastr with the result of it', () => {
      expect(toastr.error).toHaveBeenCalledWith('Alarm!');
    });

    it('should return rejected promise', done => {
      result.catch(error => {
        expect(error).toBe('Ahtung!');
        done();
      });

      $rootScope.$apply();
    });
  });

  describe('Unpack error message', () => {
    let config;
    let result;

    beforeEach(() => {
      config = {
        data: {
          error: {
            message: 'Ahtung!'
          }
        }
      };

      result = unpackInterceptorFct.response(config);
    });

    it('should call translation filter', () => {
      expect(errorMessage).toHaveBeenCalledWith('ERR_SERVER', { text: 'Ahtung!' });
    });

    it('should return rejected promise', done => {
      result.catch(error => {
        expect(error).toBe('Ahtung!');
        done();
      });

      $rootScope.$apply();
    });
  });

  it('should add interceptor', () => {
    expect($httpProviderIt.interceptors).toContain('unpackInterceptorFct');
  });
});
