
Template._frolic.helpers({
  create: function(){

  },
  rendered: function(){
  },
  destroyed: function(){

  },
  FroItem: function(){
    return FroItem;
  },
  video: function(){
    var vid = FrolicsFS.findOne({_id: this.fsId});
    // console.log("vid obj " + vid);
    return vid;
  },
  heartClass: function(){
    // console.log("heartClass log: " + this.owner().profile.name);
    return this.isHearted() ? "heart" : "heart-o";
  }
});

Template._frolic.events({
  'click .fro-heart': function(event, template){
    event.preventDefault();
    // console.log("heart clicked... " + template.data._id);
    Meteor.call("hearted", template.data._id);
  },

  'click .invoke-frolic': function(event, template){
    event.preventDefault();
    console.log("invoking frolic ... ");
    FlowRouter.go('/frolic/'+template.data._id);
  }
  // "click .flayer": function(event, template){
  //   console.log("flayer one clicked...");
  //   var flayer = videojs(event.currentTarget);
  //   flayer.paused() ? flayer.play() : flayer.pause();
  // },
  // "click .vjs-tech": function(event, template){
  //   console.log("flayer clicked ... ");
  //   var flayer = videojs(event.currentTarget);
  //   flayer.paused() ? flayer.play() : flayer.pause();
  // }
});
