

function rankByPopularity(items) {
  items = items.sort(function(item1, item2) {
    if (item1.popularity > item2.popularity) {
      return -1;
    } else if (item1.popularity < item2.popularity) {
      return 1;
    }
    return 0;
  });
  return items;
}


module.exports = {
  rankByPopularity: rankByPopularity
};