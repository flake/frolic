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

Meteor.methods({
  hearted: function(froId){
    var userId = Meteor.userId();
    var heart = Hearts.findOne({froId: froId, userId: userId});
    var froInc = 0;

    if(!heart){
      Hearts.insert({froId: froId, userId: userId});
      froInc = 1;
    }else{
      Hearts.update(heart._id, {$set: {valid: !heart.valid}});
      froInc = heart.valid ? -1 : 1;
    }

    Fros.update({_id: froId}, {$inc: {hearts: froInc}});
  }
})
