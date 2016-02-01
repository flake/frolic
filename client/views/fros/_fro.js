
Template._fro.helpers({
  create: function(){

  },
  rendered: function(){
  },
  destroyed: function(){

  },
  FroItem: function(){
    return FroItem;
  },
  froSrc: function(){
    var vid = FroFS.findOne({_id: this.fsId});
    if(vid)
      return vid.url();
    return "";
  },
  // thumbSrc: function(){
  //   var thumb = ThumbFS.findOne(this.thumb_fs);
  // }
  heartClass: function(){
    return this.isHearted() ? "heart" : "heart-o";
  }
});

Template._fro.events({
  'click .fro-heart': function(event, template){
    event.preventDefault();
    // console.log("heart clicked... " + template.data._id);
    Meteor.call("hearted", template.data._id);
  },

  'click .frolic-invoke': function(event, template){
    event.preventDefault();
    var froTabs = ["fi-froinfo", "fi-comments"];
    var fiTab = $(event.currentTarget).attr('id');
    var ftIndex = froTabs.indexOf(fiTab);
    // console.log("frolic tab: " + fiTab);
    console.log("frolic tab index: " + ftIndex);

    Session.set("slideIndex", ftIndex);
    Session.set("tabIndex", ftIndex);

    FlowRouter.go('/fro/'+template.data._id);
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

Template._fro.onCreated(function(){
  var pdata = Template.parentData(0);
  var self = this;
  self.autorun(function(){
    // self.subscribe("fro", pdata._id);
    self.subscribe("thumb_fs", pdata.thumb_fs);
    self.subscribe("fro_fs", pdata.fsId);
  });
});
