
Template.fro.helpers({
  FroScreen: function(){
    return FroScreen;
  },
  NewComment: function(){
    return NewComment;
  },
  SwipeSlides: function(){
    return SwipeSlides;
  },
  SlideTabs: function(){
    return SlideTabs;
  },
  froDoc: function(){
    return Fros.findOne(this.froId);
  },
  froFS: function(){
    // console.log("Frolic Id: " + this.froId);
    var froFS = {};
    var fro = Fros.findOne(this.froId);

    if(fro){
      froFS.fro = FroFS.findOne(fro.fsId).url();
      froFS.thumb = ThumbFS.findOne(fro.thumb_fs).url();
    }

    return froFS;
  },
  // FroTabs: function(){
  //   return FroTabs;
  // },

  tabIndex: function(){
    return parseInt(Session.get('tabIndex'));
  },
  slideIndex: function(){
    return parseInt(Session.get('slideIndex'));
  },
  heartedClass: function(){
    var fro = Fros.findOne(this.froId);
    console.log("fro hearted... " + fro.isHearted());
    return fro.isHearted() ? "heart" : "heart-o";
  },
  froTabs: function(){
    // {'title': '', 'iconClass': 'fa fa-users slidetab-ficon', 'maticon': ''}
    return [
      {'title': 'Info', 'iconClass': 'material-icons', 'maticon': 'info_outline'},
      {'title': 'Comments', 'iconClass': 'fa fa-commenting-o slidetab-ficon', 'maticon': ''},
      {'title': 'Related', 'iconClass': 'fa fa-video-camera slidetab-ficon', 'maticon': ''}
    ]
  },
  froViews: function(){
    var fro = Fros.findOne(this.froId);

    return [
      {'template': '_froinfo', 'data': {froId: this.froId}},
      {'template': 'comments', 'data': {froId: this.froId}},
      {'template': 'froList', 'data': {context: "screen_fros", screenId: fro.screenId}},
    ]
  }
});

// Template.frolic.rendered = function(){
//   Session.set('tabIndex', 0);
//   Session.set('slideIndex', 0);
// }

Template.fro.onRendered(function(){
  console.log("fro rendered...");
  // Session.setDefault('tabIndex', 0);
  Session.setDefault('slideIndex', 0);

  Tracker.autorun(function(){
    var ftindex = Session.get('slideIndex');
    var navTabs = $('.nav-tabs');
    navTabs.removeClass("tab-active");
    navTabs.eq(ftindex).addClass("tab-active");
  });
});

Template.fro.onCreated(function(){
  var pdata = Template.parentData(0);
  var self = this;
  console.log("fro on-created _id: "+pdata.froId);
  self.autorun(function(){
    self.subscribe("fro_heart", pdata.froId);
    self.subscribe("fro_screen", pdata.froId);
    self.subscribe("fro", pdata.froId);
    // self.subscribe("comments", pdata.froId);
  });
});
