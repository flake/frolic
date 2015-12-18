Members = new Mongo.Collection('members');

Members.before.insert(function(userId, doc){
  doc.createdAt = new Date();
});

Members.helpers({

});

Members.attachSchema(new SimpleSchema({
  screen_id: {
    type: String
  },
  user_id: {
    type: String
  }
}));

Meteor.methods({
  addMember: function(screenId, userId){
    check(screenId, String);
    check(memberId, String);

    var screen = Screens.findOne(screenId);
    if(screen.creator_id !== Meteor.userId()){
      throw new Meteor.Error(401, "Access denied!");
    }
    Members.insert({screen_id: screenId, user_id: userId});
  }
});
