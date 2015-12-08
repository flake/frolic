Meteor.publish("frolic", function(frolicId){
  return Frolics.find(frolicId);
});

Meteor.publish("frolics_screen", function(screenId){
  return Frolics.find({screenId: screenId});
});

Meteor.publish("frolics_home", function(){
  return Frolics.find(); //**TODO**
});

Meteor.publish('frolics_fs', function(options){
	return FrolicsFS.find({}, options);
});

Meteor.publish('hearts', function(userId){
  return Hearts.find({userId: userId});
});

Meteor.publish('comments', function(frolicId){
  return Comments.find({frolicId: frolicId});
});

Meteor.publish('profiles', function(){
  return Meteor.users.find();
});

Meteor.publish('screen', function(screenId){
  return Screens.find(screenId);
});

Meteor.publish('screen_fs', function(screenId){
  var screen = Screens.findOne(screenId);
  if(!screen){
    console.log("[PUBLISH] Screen not Found!");
    return;
  }

  return ScreensFS.find({_id:screen.cover_photo});
});
