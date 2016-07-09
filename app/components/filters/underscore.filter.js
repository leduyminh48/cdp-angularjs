/**
 * @ngdoc filter
 * @name osmFilters.underscore
 *
 * @description Performs convert to a underscored string instead of spaced one string
 */
export default () =>
  input => {
    if (!input) {
      return input;
    }

    input = input.toString();

    return input.replace(/ /g, '_');
  };
