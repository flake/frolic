
Template.welcomeLayout.helpers({
  FroDialog: function(){
    return FroDialog;
  },
  openFroDialog: function(){
    return Session.get('openFroDialog');
  },
  froMessage: function(){
    return Session.get('froMessage');
  }
});

Template.welcomeLayout.onCreated(function(){
  Session.set('openFroDialog', false);
  Session.set('froMessage', '');
});

Template.welcomeLayout.onRendered(function(){
  devHeight = $(window).innerHeight();
  $('#welcome-layout').css('min-height', devHeight);
});
