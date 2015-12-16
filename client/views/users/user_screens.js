
Template.userScreens.helpers({
  screensCreated: function(){
    console.log("user screen userId " + this.userId);
    return Screens.find({creator_id: this.userId});
  },
  screensPlaying: function(){
    // var screens = Screens.find({"members.user_id": this.userId}, {members:{$elemMatch: {"user_id": this.userId}}});
    return [];
  }
});

Template.userScreens.events({
  "click #foo": function(event, template){

  }
});
