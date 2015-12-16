Followers = new Mongo.Collection('followers');

Followers.before.insert(function(userId, doc){
  doc.createdAt = new Date();
});

Followers.after.insert(function(userId, doc){
  Screens.update({_id: doc.screen_id}, {$inc: {followers: 1}});
});
Followers.after.remove(function(userId, doc){
  Screens.update({_id: doc.screen_id}, {$inc: {followers: -1}});
});

Followers.helpers({
  user: function(){
    return Meteor.users.findOne({_id: this.user_id});
  }
});

Followers.attachSchema(new SimpleSchema({
  user_id: {
    type: String,
    autoValue: function(){
      if(this.isSet){
        return;
      }
      if(this.isInsert){
        return Meteor.userId();
      }else{
        this.unset();
      }
    }
  },
  screen_id: {
    type: String
  }
}));

Meteor.methods({
  followScreen : function(screenId){
    return Followers.insert({screen_id: screenId});
  }
})
