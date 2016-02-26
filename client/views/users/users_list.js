
Template.usersList.helpers({
  users: function(){
    var userIds = [];
    switch(this.context){
      case "user_circle":
        var cmemCurs = CircleMembers.find({userId: this.userId});
        userIds = cmemCurs.map(function(f){return f.memberId});
        break;
      case "screen_followers":
        var followersCurs = Followers.find({screen_id: this.screenId});
        userIds = followersCurs.map(function(f){return f.user_id});
        break;
      case "circle_members":
        console.log("circle Id members " + this.circleId);
        var memberCurs = CircleMembers.find({circleId: this.circleId});
        console.log("circle members list count " + memberCurs.count());
        userIds = memberCurs.map(function(f){ return f.memberId});
        console.log("circle members " + userIds);
        break;
      default:
        console.log("no context for users...");
    }
    return Meteor.users.find({_id: {$in: userIds}});
  }
});

Template.usersList.onCreated(function(){
  var pdata = Template.parentData(0);
  var self = this;

  self.autorun(function(){
     if(pdata.circleId){
       self.subscribe('circle_members', pdata.circleId);
     }
  });
});
