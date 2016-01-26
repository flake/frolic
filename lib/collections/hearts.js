Hearts = new Mongo.Collection("hearts");

Hearts.before.insert(function(userId, doc){
  doc.createdAt = new Date();
});

Hearts.after.insert(function(userId, doc){
  var fro = Fros.findOne(doc.froId);
  var notify = {
    userId: fro.userId,
    sourceId: doc.froId,
    verb: "hearted"
  }
  Meteor.call('notify', notify);
});

// Hearts.helpers({
//   isHearted: function(){
//     return Hearts.findOne({froId: this.froId, userId: this.userId});
//   }
// });

Hearts.attachSchema(new SimpleSchema({
  froId: {
    type: String
  },
  userId: {
    type: String,
    autoValue: function(){
      if(this.isSet)
        return;
      if(this.isInsert)
        return Meteor.userId();
      else {
        this.unset();
      }
    }
  },
  valid: {
    type: Boolean,
    optional: true,
    defaultValue: true
  }
}));
