Meteor.publish("fros", function(){
  return Fros.find();
});

Meteor.publish('frolics', function(options){
	return Frolics.find({}, options);
});

Meteor.publish('hearts', function(userId){
  return Hearts.find({userId: userId});
})
