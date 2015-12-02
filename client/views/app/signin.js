
Template.signin.helpers({
  create: function(){

  },
  rendered: function(){

  },
  destroyed: function(){

  },
  Signin: function(){
    return Signin;
  },
  AppHead: function(){
    return AppHead;
  },
  navicons: function(){
    return [];
  },
  title: function(){
    return "Sign into frolic";
  }
});

Template.signin.events({
  "click #navigation-back": function(event, template){
    history.back();
  }
});

Template.signin.onRendered(function(){
  $('#welcome-layout').css("background-color", "#C3D7E3");
});
