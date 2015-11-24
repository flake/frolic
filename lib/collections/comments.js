Comments = new Mongo.Collection("comments");

Comments.before.insert(function(userId, doc){
  doc.createdAt = new Date();
  doc.userId = userId;
});

Comments.helpers({
  datePublished: function(){
    return moment(this.createdAt).format('hh:mm, DD MMM YYYY');
  },
  author: function(){
    return Meteor.users.findOne({_id: this.userId});
  }
});

Comments.attachSchema(new SimpleSchema({
  content: {
    type: String,
    max: 140
  },
  frolicId: {
    type: String
  }
}));
