
Template.userScreens.helpers({
  screens: function(){
    console.log("user screen userId " + this.userId);
    var query = null;
    switch(this.context){
      case 'self':
        query = {creator_id: this.userId}
        break;
      case 'following':
        var follCurs = Followers.find({user_id: this.userId});
        var screenIds = follCurs.map(function(f){return f.screen_id});
        query = {_id: {$in: screenIds}};
        break;
      default:
        query = null;
    }
    return Screens.find(query);
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
