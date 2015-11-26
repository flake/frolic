FlowRouter.route('/', {
  // subscriptions: function(){
  //   if(Meteor.user()){
  //     this.register("frolics_home", Meteor.subscribe("frolics_home"));
  //     this.register("frolics_fs", Meteor.subscribe("frolics_fs"));
  //     this.register("hearts", Meteor.subscribe("hearts", Meteor.userId()));
  //   }
  // },

  action: function(){
    if(!Meteor.user() && !Meteor.loggingIn()){
      BlazeLayout.render('welcomeLayout', {content: 'signin'});
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

FlowRouter.route('/signup', {
  action: function(){
    if(!Meteor.user()){
      BlazeLayout.render('welcomeLayout', {content: 'signup'});
    }
  }
});

FlowRouter.route('/frolic/:frolicId', {
  // subscriptions: function(params){
    // this.register("frolic", Meteor.subscribe("frolic", params.frolicId));
    // this.register("frolics_fs", Meteor.subscribe("frolics_fs"));
    // this.register("comments", Meteor.subscribe("comments", params.frolicId));
    // this.register("profiles", Meteor.subscribe("profiles"));
  // },
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
