FlowRouter.route('/', {
  subscriptions: function(){
    if(Meteor.user()){
      this.register("hfros", Meteor.subscribe("fros"));
      this.register("frolics", Meteor.subscribe("frolics"));
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
