Meteor.publish("fro", function(froId){
  return Fros.find(froId);
});

Meteor.publish("fros_screen", function(screenId){
  return Fros.find({screenId: screenId});
});

Meteor.publish("fros_home", function(){
  var froCurs = Fros.find(); //**TODO**
  var screenIds = froCurs.map(function(f){return f.screenId});

  return [
    froCurs,
    Screens.find({_id: {$in: screenIds}}),
    ScreensFS.find()
  ];
});

Meteor.publish('fros_fs', function(options){
	return FrolicsFS.find({}, options);
});

Meteor.publish('hearted_fros', function(userId){
  var hcurs = Hearts.find({userId: userId, valid:true});
  var froIds = hcurs.map(function(f){ return f.froId; });
  var fcurs = Fros.find({_id: {$in: froIds}});
  var screenIds = fcurs.map(function(f){ return f.screenId});
  var scurs = Screens.find({_id: {$in: screenIds}});
  return [ hcurs, fcurs, scurs ];
});

Meteor.publish('hearts', function(userId){
  return Hearts.find({userId: userId});
});

Meteor.publish('comments', function(froId){
  return Comments.find({froId: froId});
});

Meteor.publish('profile', function(userId){
  return Meteor.users.find(userId, {profile : 1});
});

Meteor.publish('profiles', function(){
  return Meteor.users.find({}, {profile : 1});
});

Meteor.publish('screen', function(screenId){
  var screen = Screens.findOne(screenId);
  var userId = screen ? screen.creator_id : null;
  var follCurs = Followers.find({screen_id: screenId});

  return [
    Screens.find(screenId),
    Meteor.users.find(userId),
    ScreensFS.find({_id: {$in: [screen.cover_photo, screen.avatar_photo]}}),
    follCurs
  ];
});

Meteor.publish('user_screens', function(userId){
  var follCurs = Followers.find({user_id: userId});
  var screenIds = follCurs.map(function(f){return f.screen_id});

  return [
    follCurs,
    Screens.find({$or: [{_id: {$in: screenIds}}, {creator_id: userId}]}),
    ScreensFS.find()
  ];
});

// Meteor.publish('screen_fs', function(screenId){
//   var screen = Screens.findOne(screenId);
//   if(!screen){
//     console.log("[PUBLISH] Screen not Found!");
//     return;
//   }
//
//   return ScreensFS.find({_id:screen.cover_photo});
// });
