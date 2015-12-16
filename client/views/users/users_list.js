
Template.usersList.helpers({
  users: function(){
    var userIds = [];
    switch(this.context){
      case "screen_followers":
        var followersCurs = Followers.find({screen_id: this.screenId});
        userIds = followersCurs.map(function(f){return f.user_id});
        break;
      default:
        console.log("no context for users...");
    }
    return Meteor.users.find({_id: {$in: userIds}});
  }
});

Template.usersList.events({
  "click #foo": function(event, template){

  }
});
