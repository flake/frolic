
Template.userScreens.helpers({
  screensCreated: function(){
    console.log("user screen userId " + this.userId);
    return Screens.find({creator_id: this.userId});
  },
  screensPlaying: function(){
    var membs = Members.find({user_id: this.userId});
    var screenIds = membs.map(function(m){return m.screen_id;});
    // {"members.user_id": this.userId}, {members:{$elemMatch: {"user_id": this.userId}}}
    return Screens.find({_id: {$in: screenIds}});
  }
});

Template.userScreens.events({
  "click #foo": function(event, template){

  }
});
