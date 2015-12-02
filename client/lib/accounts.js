Accounts.onLogin(function(){
  redirect = Session.get('redirectAfterLogin');
  if(redirect && redirect !== '/login')
    FlowRouter.go(redirect);

  Meteor.logoutOtherClients();
  Session.set('loggedIn', true);
});
