Meteor.startup(function(){
  injectTapEventPlugin();

  // Session.set("appTitle", 'frolic');
  Session.set("sideNav", false);

  document.addEventListener("deviceready", onDeviceReady, false);

  Tracker.autorun(function(){
    if(!Meteor.userId() && Session.get('loggedIn')){
      FlowRouter.go(FlowRouter.path('login'));
    }
  });

  ValidateForm.config({
    debug: true,
    rootLayout: 'appLayout'
  });
  // window.onpopstate = function(){
  //   if(history.state && history.state.initial === true){
  //     //navigator.app.exitApp();
  //
  //     window.plugins.Suspend.suspendApp();
  //   }
  // }
});
