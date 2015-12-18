
Template.screen.helpers({
  ProCover: function(){
    return ProCover;
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
  screenIndex: function(){
    return parseInt(Session.get('slideIndex'));
  },
  SlideTabs: function(){
    return SlideTabs;
  },
  SwipeSlides: function(){
    return SwipeSlides;
  },
  slideTabs: function(){
    return [
      {'title': 'Fros', 'iconClass': 'fa fa-video-camera slidetab-ficon', 'maticon': ''},
      {'title': 'Info', 'iconClass': 'material-icons', 'maticon': 'info_outline'},
      {'title': 'Followers', 'iconClass': 'fa fa-users slidetab-ficon', 'maticon': ''}
    ]
  },
  slideViews: function(){
    return [
      {'template': 'froList', 'data': {context: "screen_fros", screenId: this.screenId}},
      {'template': 'screenProfile', 'data': {screenId: this.screenId}},
      {'template': 'usersList', 'data': {context: "screen_followers", screenId: this.screenId}}
    ];
  }

  // frolics: function(){
  //   return Frolics.find({screenId: this.screenId});
  // }
});

Template.screen.events({
  // events
});

Template.screen.onCreated(function(){
  Session.set('appTitle', "Screen");
  Session.set('slideIndex', 0);
  var pdata = Template.parentData(0);
  var self = this;
  // console.log("screen template parent Id " + pdata.screenId);
  self.autorun(function(){
    self.subscribe("screen", pdata.screenId);
    // self.subscribe("screen_fs", pdata.screenId);
    self.subscribe("fros_screen", pdata.screenId);
    self.subscribe("profiles");
  });
});
