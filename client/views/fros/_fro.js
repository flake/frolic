
Template._fro.helpers({
  FroFeed: function(){
    return FroFeed;
  },
  // froSrc: function(){
  //   var vid = FroFS.findOne({_id: this.fsId});
  //   if(vid)
  //     return vid.url();
  //   return "";
  // },
  // thumbSrc: function(){
  //   var thumb = ThumbFS.findOne(this.thumb_fs);
  // }
  heartedClass: function(){
    return this.isHearted() ? "heart" : "heart-o";
  },
  playSelect: function(){
    return this._id === Session.get("froPlay");
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
    // var froTabs = ["fi-froinfo", "fi-comments"];
    // var fiTab = $(event.currentTarget).attr('id');
    // var ftIndex = froTabs.indexOf(fiTab);
    // console.log("frolic tab: " + fiTab);
    // console.log("frolic tab index: " + ftIndex);

    Session.set("slideIndex", 0);
    Session.set("froPlay", template.data._id);
    // Session.set("tabIndex", ftIndex);

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
    self.subscribe("fro", pdata._id);
    // self.subscribe("thumb_fs", pdata.thumb_fs);
    // self.subscribe("fro_fs", pdata.fsId);
  });
});

// Template._fro.onRendered(function(){
//   var windowTop = $(window).scrollTop();
//   console.log("fro rendered window top " + windowTop);
//   $(window).scrollTop(windowTop + 100);
// })
