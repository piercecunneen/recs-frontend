
function getUserInfo( callback) {
  /* eslint-disable max-len */
  var url = '/me?fields=name,friends,email,first_name,last_name,age_range,link,gender,locale,picture,timezone,updated_time,verified';
  /* eslint-enable max-len */
  FB.api(url, function(response) {
    if (response.error) {
      callback(response.error);
    } else {
      callback(null, response);
    }
  });
}

module.exports = {
  getUserInfo: getUserInfo
};