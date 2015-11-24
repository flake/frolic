Hearts = new Mongo.Collection("hearts");

Hearts.before.insert(function(userId, doc){
  doc.createdAt = new Date();
});

// Hearts.helpers({
//   isHearted: function(){
//     return Hearts.findOne({froId: froId, userId: userId});
//   }
// });

Hearts.attachSchema(new SimpleSchema({
  frolicId: {
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
  hearted: function(frolicId){
    var userId = Meteor.userId();
    var heart = Hearts.findOne({frolicId: frolicId, userId: userId});
    var froInc = 0;
    if(!heart){
      Hearts.insert({froId: frolicId, userId: userId});
      froInc = 1;
    }else{
      Hearts.update(heart._id, {$set: {valid: !heart.valid}});
      heart.valid ? froInc = -1 : froInc = 1;
    }

    Frolics.update(frolicId, {$inc: {hearts: froInc}});
  }
})
