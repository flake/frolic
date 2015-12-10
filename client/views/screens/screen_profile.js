
Template.screenProfile.helpers({
  create: function(){

  },
  rendered: function(){

  },
  destroyed: function(){

  },
  UserCard: function(){
    return UserCard;
  },
  creator: function(){
    // console.log("screen profile Id: " + this.screenId);
    var screen = Screens.findOne(this.screenId);
    // console.log("screen creator " + prettyJSON(screen.creator()));
    return screen.creator();
  }
});

Template.screenProfile.events({
  "click #foo": function(event, template){

  }
});
