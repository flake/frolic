Screens = new Mongo.Collection('screens');

Screens.before.insert(function(userId, doc){
  // console.log("Screens before insert userId: " + userId);
  doc.createdAt = new Date();
});

Screens.helpers({
  creator: function(){
    return Meteor.users.findOne({_id: this.creator_id});
  },
  cover: function(){
    return ScreensFS.findOne(this.cover_photo);
  },
  avatar: function(){
    return ScreensFS.findOne(this.avatar_photo);
  },
  isMember: function(userId){

  }
});

Screens.attachSchema(new SimpleSchema({
  title: {
    type: String,
    max: 64
  },
  description: {
    type: String,
    max: 400
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
    defaultValue: 0
  },
  members: {
    type: Array,
    optional: true,
    defaultValue: []
  },
  "members.$":{
    type: Object
  },
  "members.$.user_id":{
    type: String,
    autoValue: function(){
      if(this.isSet){
        if(Meteor.users.findOne(this.value))
          return this.value;
        else {
          this.unset();
        }
      }
    }
  },
  "members.$.role":{
    type: String,
    allowedValues: ["manager", "player"]
  }
}));

Meteor.methods({
  addScreen: function(screen){
    var screenId = Screens.insert(screen);
    return screenId;
  }
});
