Hearts = new Mongo.Collection("hearts");

Hearts.before.insert(function(userId, doc){
  doc.createdAt = new Date();
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
    type: String
  },
  valid: {
    type: Boolean,
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
