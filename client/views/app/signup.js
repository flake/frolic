
Template.signup.helpers({
  create: function(){

  },
  rendered: function(){

  },
  destroyed: function(){

  },
  Signup: function(){
    return Signup;
  },
  LoginBtn: function(){
    return LoginBtn;
  }
});

Template.signup.events({
  "click #foo": function(event, template){

  }
});

Template.signup.onRendered(function(){
  $('#welcome-layout').css("background-color", "#1690DB");
});
