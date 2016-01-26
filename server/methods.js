Meteor.methods({
  newComment: function(comment){
    var commentId = Comments.insert(comment);

    return commentId;
  },
  followScreen : function(screenId){
    check(screenId, String);
    return Followers.insert({screen_id: screenId});
  },
  unfollow: function(screenId){
    check(screenId, String);
    return Followers.remove({screen_id: screenId, user_id: Meteor.userId()});
  },
  addFro:function(fro){
    var froId = Fros.insert(fro);

    return froId;
  },
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
  },
  addMember: function(screenId, userId){
    check(screenId, String);
    check(memberId, String);

    var screen = Screens.findOne(screenId);
    if(screen.creator_id !== Meteor.userId()){
      throw new Meteor.Error(401, "Access denied!");
    }
    Members.insert({screen_id: screenId, user_id: userId});
  },
  notify: function(notify){
    var user = Meteor.user();
    if(notify.userId !== user._id){
      Notifications.insert(notify);
    }
  },
  addScreen: function(screen){
    var screenId = Screens.insert(screen);
    return screenId;
  }
});
