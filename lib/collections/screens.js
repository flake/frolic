Screens = new Mongo.Collection('screens');

Screens.before.insert(function(userId, doc){
  console.log("Screens before insert userId: " + userId);
  doc.createdAt = new Date();
});

Screens.helpers({
  // here goes helpers
});

Screens.attachSchema(new SimpleSchema({
  title: {
    type: String,
    max: 64
  },
  owner_id: {
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
  owner_name: {
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
  }
}));

Meteor.methods({
  addScreen: function(screen){
    var screenId = Screens.insert(screen);
    return screenId;
  }
});
