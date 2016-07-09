import angular from 'angular';

export default /*@ngInject*/($delegate, uiGridConstants) => {
  /**
   * @param baseOptions
   * @description Transforms option for defaultOption into ui-grid acceptable format
   */
  const setDefaultSorting = baseOptions => {
    const { columnDefs, defaultSort } = baseOptions;

    if (!columnDefs || !defaultSort) {
      return;
    }

    const { name, order: casedOrder = 'ASC' } = defaultSort;
    const order         = casedOrder.toUpperCase();
    const defaultColumn = columnDefs.find(column => column.name === name);

    defaultColumn.sort = angular.extend({}, defaultColumn.sort, {
      direction: uiGridConstants[order]
    });
  };


  const initializeNative = $delegate.initialize;

  /**
   * Decorate service
   */
  $delegate.initialize = function (baseOptions, ...args) {
    baseOptions.enableColumnMenus = baseOptions.enableColumnMenus === true;
    baseOptions.rowHeight         = baseOptions.rowHeight || 37;

    setDefaultSorting(baseOptions);

    return initializeNative.call(this, baseOptions, ...args);
  };

  return $delegate;
};
