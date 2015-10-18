FlowRouter.route('/', {
  action: function(){
  /*  if(!Meteor.user() && !Meteor.loggingIn()){
      BlazeLayout.render(Welcome, {content: <Signin />});
    }else{
      BlazeLayout.render(App, {content: <Home />});
    } */
    BlazeLayout.render('appLayout', {content: 'home'});
  }
});

FlowRouter.route('/signup', {
  action: function(){
    if(!Meteor.user()){
      BlazeLayout.render('welcomeLayout', {content: 'signup'});
    }
  }
});
