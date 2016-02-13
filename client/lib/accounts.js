Accounts.onLogin(function(){
  redirect = Session.get('redirectAfterLogin');
  // console.log("Accounts on login");
  if(redirect && redirect !== '/login')
    FlowRouter.go(redirect);

  // Meteor.logoutOtherClients();
  Session.set('loggedIn', true);
  console.log("Accounts on login finish");
});
