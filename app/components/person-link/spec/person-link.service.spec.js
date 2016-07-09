/* eslint max-statements: 0, angular/file-name: 0, max-nested-callbacks: 0 */
import angular  from 'angular';
import module   from '../person-link.module';


describe('Factory: linkFct', () => {
  let linkFct;

  beforeEach(angular.mock.module(module, $provide => {
    $provide.constant('telescopePersonUrlConst', 'telescope.com');
    $provide.constant('upsaPersonConst', {
      url        : 'upsa.com',
      personParam: 'name'
    });
  }));

  beforeEach(inject(_linkFct_ => {
    linkFct = _linkFct_;
  }));


  describe('Telescope profile link', () => {
    it('should get link to a profile with spaced names', () => {
      const result = linkFct.getToTelescope('Foo Bar');

      expect(result).toBe('telescope.com/foo_bar');
    });


    it('should get link to a profile with notspaced names', () => {
      const result = linkFct.getToTelescope('Foo-Bar');

      expect(result).toBe('telescope.com/foo-bar');
    });
  });


  describe('Upsa profile link', () => {
    it('should get link to a profile', () => {
      const result = linkFct.getToUpsa('foo-bar');

      expect(result).toBe('upsa.com?name=foo-bar');
    });
  });
});
