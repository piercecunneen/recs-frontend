function formatSearchString(query) {
  /*
    query:
      type: string
      description: a query string with spaces
    returns:
      the query string with '+' instead of spaces
  */
  return query.replace(/ /g, '+');
}

module.exports = formatSearchString;
