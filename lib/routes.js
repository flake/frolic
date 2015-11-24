FlowRouter.route('/', {
  subscriptions: function(){
    if(Meteor.user()){
      this.register("frolics_home", Meteor.subscribe("frolics_home"));
      this.register("frolics_fs", Meteor.subscribe("frolics_fs"));
      this.register("hearts", Meteor.subscribe("hearts", Meteor.userId()));
    }
  },

  action: function(){
    if(!Meteor.user() && !Meteor.loggingIn()){
      BlazeLayout.render('welcomeLayout', {content: 'signin'});
    }else{
      BlazeLayout.render('appLayout', {content: 'home'});
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
  subscriptions: function(params){
    this.register("frolic", Meteor.subscribe("frolic", params.frolicId));
    this.register("frolics_fs", Meteor.subscribe("frolics_fs"));
  },
  action: function(params){
    BlazeLayout.render('appLayout', {content: 'frolic', params: params});
  }
});
