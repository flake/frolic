Meteor.startup(function(){
  injectTapEventPlugin();

  Session.set("appTitle", 'frolic');
  Session.set("sideNav", false);

  document.addEventListener("deviceready", onDeviceReady, false);
  // window.onpopstate = function(){
  //   if(history.state && history.state.initial === true){
  //     //navigator.app.exitApp();
  //
  //     window.plugins.Suspend.suspendApp();
  //   }
  // }
});
