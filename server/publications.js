Meteor.publish("fros", function(){
  return Fros.find();
});

Meteor.publish('frolics', function(options){
	return Frolics.find({}, options);
});
