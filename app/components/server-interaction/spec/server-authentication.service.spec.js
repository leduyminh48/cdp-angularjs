/* eslint max-statements: 0, angular/file-name: 0, max-nested-callbacks: 0 */
import angular      from 'angular';
import serverModule from '../server-interaction.module';


describe('Factory: interceptor authInterceptorFct', () => {
  let authInterceptorFct;
  let $httpProviderIt;

  beforeEach(angular.mock.module(serverModule, ($httpProvider, $provide) => {
    $httpProviderIt = $httpProvider;
    $provide.constant('baseApiUrl', 'foo-bar');
  }));

  beforeEach(inject(_authInterceptorFct_ => {
    authInterceptorFct = _authInterceptorFct_;
  }));


  it('should not add auth for templates call', () => {
    const config = {
      url    : 'foo.html',
      headers: {}
    };
    const result = authInterceptorFct.request(config);

    expect(result.withCredentials).toBeUndefined();
  });


  it('should not add auth for not server api call', () => {
    const config = {
      url    : 'some-server/foo-bar/url.json',
      headers: {}
    };
    const result = authInterceptorFct.request(config);

    expect(result.withCredentials).toBeUndefined();
  });


  it('should add auth for server api call', () => {
    const config = {
      url    : 'foo-bar/url.json',
      headers: {}
    };
    const result = authInterceptorFct.request(config);

    expect(result.withCredentials).toBeTruthy();
  });

  it('should add interceptor', () => {
    expect($httpProviderIt.interceptors).toContain('authInterceptorFct');
  });
});
