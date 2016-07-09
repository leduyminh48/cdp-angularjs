/**
 * @ngdoc service
 * @name osmRouter.routerStatusFct
 *
 * @description Services for holding and getting router states
 * @todo: Change the behavior it may provide unexpected results
 */
export default /*@ngInject*/function () {
  const isLocalRun = () => location.host.indexOf('localhost') > -1 || location.host.indexOf('file:') > -1;

  this.isLocalRun = isLocalRun;

  this.$get = () => ({
    isLocalRun
  });
}
