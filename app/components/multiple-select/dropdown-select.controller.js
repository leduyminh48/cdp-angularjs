/**
 * @ngdoc controller
 * @name osmMultipleSelect.DropdownSelectCtrl
 * @class
 *
 * @description Controller for dropdown select component
 */
export default class {
  constructor() {
    this.defaultEmptyText = 'Please select';
    /**
     * @ngdoc property
     * @propertyOf osmMultipleSelect.DropdownSelectCtrl
     * @name osmMultipleSelect.DropdownSelectCtrl#onSelect
     *
     * @type {Function}
     * @description Callback on select an item
     */
    /**
     * @ngdoc property
     * @propertyOf osmMultipleSelect.DropdownSelectCtrl
     * @name osmMultipleSelect.DropdownSelectCtrl#selected
     *
     * @type {Object}
     * @description Selected item
     */
    /**
     * @ngdoc property
     * @propertyOf osmMultipleSelect.DropdownSelectCtrl
     * @name osmMultipleSelect.DropdownSelectCtrl#titleKey
     *
     * @type {string}
     * @description key for a title property
     */
    /**
     * @ngdoc property
     * @propertyOf osmMultipleSelect.DropdownSelectCtrl
     * @name osmMultipleSelect.DropdownSelectCtrl#emptyText
     *
     * @type {string}
     * @description text to show in selection field by default
     */
  }

  /**
   * @ngdocs method
   * @methodOf osmMultipleSelect.DropdownSelectCtrl
   * @name osmMultipleSelect.DropdownSelectCtrl#onKeypress
   *
   * @param {Object} item Item on which key press was performed
   * @param {Event} event Key press event
   *
   * @description Handler for key press on an item element
   */
  onKeypress(item, event) {
    if (event.which === 13) {
      this.onSelect({ item });
    }
  }


  /**
   * @ngdocs method
   * @methodOf osmMultipleSelect.DropdownSelectCtrl
   * @name osmMultipleSelect.DropdownSelectCtrl#onClick
   *
   * @param {Object} item Item on which click was performed
   *
   * @description Handler for click on item.
   */
  onClick(item) {
    this.onSelect({ item });
  }


  /**
   * @ngdocs method
   * @methodOf osmMultipleSelect.DropdownSelectCtrl
   * @name osmMultipleSelect.DropdownSelectCtrl#getSelectedText
   *
   * @returns {string} Text to show in selected window
   *
   * @description Determines text to show in selected window
   */
  getSelectedText() {
    return this.selected && this.selected[this.titleKey] || this.emptyText || this.defaultEmptyText;
  }
}
