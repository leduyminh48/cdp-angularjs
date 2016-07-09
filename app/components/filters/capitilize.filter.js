/**
 * @ngdoc filter
 * @name osmFilters.capitalize
 *
 * @description Performs convert to a capitalized string
 */
export default () =>
  input => {
    if (!input) {
      return input;
    }

    input = input.toString();

    return input.charAt(0).toUpperCase() + input.slice(1);
  };
