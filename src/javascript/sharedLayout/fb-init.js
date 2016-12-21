
/* eslint-disable */
window.fbAsyncInit = function() {
  console.log("Initializing");
  FB.init({
    appId      : '230889920682437',
    xfbml      : true,
    version    : 'v2.8'
  });
  FB.AppEvents.logPageView();

  FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        if (window.location.href === "http://localhost:5000/login") {
          window.location.href = "/";
        }
        console.log("connected");
      } else {
        console.log("Not connected");
        FB.login();
      }
    });
};
/* eslint-enable */