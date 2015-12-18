Meteor.startup(function(){
  Followers._ensureIndex({screen_id: 1, user_id: 1}, {unique: true});
});
