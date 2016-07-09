/* eslint max-statements: 0, angular/file-name: 0, max-nested-callbacks: 0 */
import angular      from 'angular';
import serverModule from '../server-interaction.module';


describe('Factory: interceptor urlInterceptorFct', () => {
  let urlInterceptorFct;
  let $httpProviderIt;
  const baseApiUrl = '/hi-there';

  beforeEach(angular.mock.module(serverModule, ($httpProvider, $provide) => {
    $provide.constant('baseApiUrl', baseApiUrl);
    $httpProviderIt = $httpProvider;
  }));

  beforeEach(inject(_urlInterceptorFct_ => {
    urlInterceptorFct = _urlInterceptorFct_;
  }));

  describe('#request', () => {
    it('should properly change request config', () => {
      const config = {
        url: '{api}/bar'
      };
      const result = urlInterceptorFct.request(config);

      expect(result.url).toBe(`${ baseApiUrl }/bar`);
      expect(config.url).toBe(`${ baseApiUrl }/bar`);
    });

    it('should properly change request config', () => {
      const url = 'very/long/api/url?param=true';
      const config = {
        url: `{api}/${ url }`
      };
      const result = urlInterceptorFct.request(config);

      expect(result.url).toBe(`${ baseApiUrl }/${ url }`);
      expect(config.url).toBe(`${ baseApiUrl }/${ url }`);
    });

    it('should add interceptor', () => {
      expect($httpProviderIt.interceptors).toContain('urlInterceptorFct');
    });
  });
});
