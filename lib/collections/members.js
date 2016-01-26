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
