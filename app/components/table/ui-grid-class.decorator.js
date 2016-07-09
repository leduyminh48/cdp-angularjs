export default /*@ngInject*/($delegate, uiGridConstants) => {
  const { ASC, DESC } = uiGridConstants;
  const orders = new Set([ASC, DESC]);

  const sortColumnNative = $delegate.prototype.sortColumn;

  /**
   * Decorate service
   */
  /**
   * Small decoration to be able to fix sort constants if they ever changed
   */
  $delegate.prototype.sortColumn = function (column, directionOrAdd, ...args) {
    if (typeof directionOrAdd !== 'boolean' && !orders.has(directionOrAdd)) {
      directionOrAdd = uiGridConstants[directionOrAdd.toUpperCase()] || uiGridConstants.ASC;
    }

    return sortColumnNative.call(this, column, directionOrAdd, ...args);
  };

  return $delegate;
};
