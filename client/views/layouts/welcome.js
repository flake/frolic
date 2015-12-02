
Template.welcomeLayout.helpers({
  create: function(){

  },
  rendered: function(){

  },
  destroyed: function(){

  }
});

Template.welcomeLayout.events({
  "click #foo": function(event, template){

  }
});

Template.welcomeLayout.onRendered(function(){
  devHeight = $(window).innerHeight();
  $('#welcome-layout').css('min-height', devHeight);
});
