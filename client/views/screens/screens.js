
Template.screens.helpers({
  sdata: function(){
    return {userId: Meteor.userId()};
  }
});

Template.screens.onCreated(function(){
  Session.set('appTitle', 'Screens');
  var self = this;
  self.autorun(function(){
    self.subscribe('user_screens', Meteor.userId());
  });
});
