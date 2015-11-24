Meteor.publish("frolic", function(frolicId){
  return Frolics.find(frolicId);
});

Meteor.publish("frolics_home", function(){
  return Frolics.find();
});

Meteor.publish('frolics_fs', function(options){
	return FrolicsFS.find({}, options);
});

Meteor.publish('hearts', function(userId){
  return Hearts.find({userId: userId});
})
