Screens = new Mongo.Collection('screens');

Screens.before.insert(function(userId, doc){
  // console.log("Screens before insert userId: " + userId);
  doc.createdAt = new Date();
});

Screens.helpers({
  creator: function(){
    return Meteor.users.findOne({_id: this.creator_id});
  }
});

Screens.attachSchema(new SimpleSchema({
  title: {
    type: String,
    max: 64
  },
  creator_id: {
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
  creator_name: {
    type: String,
    autoValue: function(){
      if(this.isSet)
        return;
      if(this.isInsert)
        return Meteor.user().profile.name;
      else {
        this.unset();
      }
    }
  },
  cover_photo: {
    type: String,
    optional: true
  },
  avatar_photo: {
    type: String,
    optional: true
  },
  followers: {
    type: Number,
    optional: true,
    defaulValue: 0
  }
}));

Meteor.methods({
  addScreen: function(screen){
    var screenId = Screens.insert(screen);
    return screenId;
  }
});
