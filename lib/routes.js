FlowRouter.route('/', {
  action: function(){
    if(!Meteor.user() && !Meteor.loggingIn()){
      BlazeLayout.render('welcomeLayout', {content: 'signup'});
    }else{
      var navIcons = [
        {"id": "frolic-search", "class": "material-icons", "maticon": "search"},
        {"id": "frolic-notify", "class": "material-icons", "maticon": "notifications"},
        {"id": "frolic-videocam", "class": "material-icons", "maticon": "videocam"},
      ];
      // Session.set("navIcons", navIcons);
      var params = { navicons : navIcons };
      BlazeLayout.render('appLayout', {content: 'home', params: params});
    }
  }
});

FlowRouter.route('/login', {
  action: function(){
    if(!Meteor.user()){
      BlazeLayout.render('welcomeLayout', {content: 'signin'});
    }
  }
});

FlowRouter.route('/frolic/:frolicId', {
  action: function(params){
    var navIcons = [
      {"id": "frolic-view", "class": "nav-tabs tab-active material-icons", "maticon": "movie"},
      {"id": "frolic-comments", "class": "nav-tabs material-icons", "maticon": "sms"},
      {"id": "frolic-related", "class": "nav-tabs material-icons", "maticon": "party_mode"},
    ];
    // Session.set("navIcons", navIcons);
    params.navicons = navIcons;
    BlazeLayout.render('appLayout', {content: 'frolic', params: params});
  }
});
