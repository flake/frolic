
Template.screen.helpers({
  create: function(){
     console.log("screen created...");
  },
  rendered: function(){
     console.log("screen rendered...");
  },
  destroyed: function(){
     console.log("screen distroyed...");
  },
  screen: function(){
    return Screens.findOne(this.screenId);
  },
  screenFS: function(){
    var screen = Screens.findOne(this.screenId);
    if(screen)
      return ScreenFS.findOne({_id: screen.cover_photo});
    else {
      return null;
    }

  }
});

Template.screen.events({
  // events
});
