
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
  ProfileCover: function(){
    return ProfileCover;
  },
  screen: function(){
    return Screens.findOne(this.screenId);
  },
  screenFS: function(){
    var screen = Screens.findOne(this.screenId);
    if(screen)
      return ScreensFS.findOne({_id: screen.cover_photo});
    else {
      return null;
    }

  },

  FroMini: function(){
    return FroMini;
  },
  frolics: function(){
    return Frolics.find({screenId: this.screenId});
  }
});

Template.screen.events({
  // events
});

Template.screen.onCreated(function(){
  Session.set('appTitle', "Screen");
  var pdata = Template.parentData(0);
  var self = this;
  // console.log("screen template parent Id " + pdata.screenId);
  self.autorun(function(){
    self.subscribe("screen", pdata.screenId);
    self.subscribe("screen_fs", pdata.screenId);
    self.subscribe("frolics_screen", pdata.screenId);
  });
});
