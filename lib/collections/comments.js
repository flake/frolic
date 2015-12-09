Comments = new Mongo.Collection("comments");

Comments.before.insert(function(userId, doc){
  doc.createdAt = new Date();
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
  froId: {
    type: String
  },
  userId: {
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
  }
}));

Meteor.methods({
  newComment: function(comment){
    var commentId = Comments.insert(comment);

    return commentId;
  }
});
