Meteor.publish("fro", function(froId){
  return Fros.find(froId);
});

Meteor.publish("fros_screen", function(screenId){
  return Fros.find({screenId: screenId});
});

Meteor.publish("fros_home", function(){
  return Fros.find(); //**TODO**
});

Meteor.publish('fros_fs', function(options){
	return FrolicsFS.find({}, options);
});

Meteor.publish('hearts', function(userId){
  return Hearts.find({userId: userId});
});

Meteor.publish('comments', function(froId){
  return Comments.find({froId: froId});
});

Meteor.publish('profiles', function(){
  return Meteor.users.find({}, {profile : 1});
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
