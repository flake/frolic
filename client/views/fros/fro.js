
Template.fro.helpers({
  FroScreen: function(){
    return FroScreen;
  },
  froDoc: function(){
    // console.log("frolic doc Id: " + this.frolicId);
    // var frolic = Frolics.findOne(this.frolicId);
    // console.log("frolic object " + typeof(frolic));
    // prettyJSON(frolic);
    return Fros.findOne(this.froId);
  },
  frolicFS: function(){
    console.log("Frolic Id: " + this.froId);
    var fro = Fros.findOne(this.froId);
    if(fro)
      return FroFS.findOne({_id: fro.fsId});
    else {
      return null;
    }
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
  SwipeSlides: function(){
    return SwipeSlides;
  },
  froTabs: function(){
    // {'title': '', 'iconClass': 'fa fa-users slidetab-ficon', 'maticon': ''}
    return [
      {'title': 'Info', 'iconClass': 'material-icons', 'maticon': 'info_outline'},
      {'title': 'Comments', 'iconClass': 'fa fa-commenting-o slidetab-ficon', 'maticon': ''}
    ]
  },
  froViews: function(){
    return [
      {'template': '_froInfo', 'data': {fro: Fros.findOne(this.froId)}},
      {'template': 'comments', 'data': {froId: this.froId}}
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
