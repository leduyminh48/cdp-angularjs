/**
 * @ngdoc filter
 * @name osmFilters.markdown
 *
 * @description Performs convert of markdown into html. Currently support * and _ tags (bold and italic)
 */
export default () => {
  const parsers = [
    {
      regexp  : /(\*\*|__)(.*?)\1/g,
      replacer: '<b>$2</b>'
    },
    {
      regexp  : /(\*|_)(.*?)\1/g,
      replacer: '<i>$2</i>'
    }
  ];

  return input =>
    parsers.reduce((input, parser) =>
        input.replace(parser.regexp, parser.replacer),
      input.toString());
};
