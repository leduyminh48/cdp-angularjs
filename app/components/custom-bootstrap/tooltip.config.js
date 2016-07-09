/**
 * Configure bootstrap tooltip
 */
/*@ngInject*/
const tooltipConfig = $uibTooltipProvider => {
  $uibTooltipProvider.options({
    placement   : 'auto top',
    animation   : true,
    popupDelay  : 1000,
    appendToBody: true
  });
};

export default tooltipConfig;
