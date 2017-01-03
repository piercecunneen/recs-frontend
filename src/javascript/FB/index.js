

function FBinitialize(callback) {
  FB.init({
    appId      : '230889920682437',
    xfbml      : true,
    version    : 'v2.8'
  });
  if (callback) {
    callback();
  }
}

function getUserInfo(authToken, callback) {
  /* eslint-disable max-len */
  var url = '/me?fields=id,name,email,age_range,gender';
  /* eslint-enable max-len */
  FB.api(
    url,
    {access_token: authToken},
    function(response) {
      if (response.error) {
        callback(response.error);
      } else {
        var lower_age = response.age_range.min;
        var upper_age = response.age_range.max;
        var user = {
          name:            response.name,
          email:           response.email || "None",
          lower_age_limit: lower_age || 0,
          upper_age_limit: upper_age || 10000,
          fb_id:           Number(response.id),
          gender:          response.gender == "male" ? "M" : "F" // to do, allow for all genders
        };
        callback(null, user);
      }
    }
  );
}

function getUserFriends(authToken, callback) {
  var url = '/me?fields=friends';
  /* eslint-enable max-len */
  FB.api(
    url,
    {access_token: authToken},
    function(response) {
    if (response.error) {
      callback(response.error);
    } else {
      callback(null, response.friends);
    }
  });
}

module.exports = {
  getUserInfo:    getUserInfo,
  getUserFriends: getUserFriends,
  FBinitialize:   FBinitialize
};