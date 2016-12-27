
function getUserInfo(callback) {
  /* eslint-disable max-len */
  var url = '/me?fields=id,name,email,age_range,gender';
  /* eslint-enable max-len */
  FB.api(url, function(response) {
    if (response.error) {
      callback(response.error);
    } else {
      var lower_age = response.age_range.min;
      var upper_age = response.age_range.max;
      var user = {
        name:            response.name,
        email:           response.email,
        lower_age_limit: lower_age,
        upper_age_limit: upper_age,
        fb_id:           Number(response.id),
        gender:          response.gender == "male" ? "M" : "F" // to do, allow for all genders
      };
      callback(null, user);
    }
  });
}

module.exports = {
  getUserInfo: getUserInfo
};