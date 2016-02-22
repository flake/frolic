
Template.appLayout.helpers({
  AppHead: function(){
    return AppHead;
  },
  dialogView: function(){
    return Session.get('dialogView');
  },
  title: function(){
    return Session.get('appTitle');
  },
  sideNav: function(){
    return Session.get('sideNav');
  },
  notifyCount: function(){
    return Notifications.find({userId: Meteor.userId(), read: false}).count();
  },
  CircleMenu: function(){
    return CircleMenu;
  },
  openCircleMenu: function(){
    return Session.get('openCircleMenu');
  },
  CircleNew: function(){
    return CircleNew;
  },
  openCircleNew: function(){
    return Session.get('openCircleNew');
  },
  frosrc: function(){
    return Session.get('frosrc');
  },
  circles: function(){
    var docs = Circles.find({userId: Meteor.userId()}).fetch();
    console.log("userId: " + Meteor.userId() + " circles " + docs);
    return docs;
  }
});

Template.appLayout.events({
  "click #frolic-videocam": function(event, template){
    if(Meteor.isCordova){
      FroTrans.open(froSuccess, froFail, "");
    }
    // var froPath = "/storage/emulated/0/frolic/frolic.mp4";
    // froSuccess(froPath);
  },

  "click #frolic-notify": function(event, template){
    FlowRouter.go('/notify');
  },

  'click #navigation-back': function(event, template){
    history.back();
  },

  'click #navicon-right': function(event, template){
    Session.set("sideNav", !Session.get("sideNav"));
  },

  'click .nav-tabs': function(event, template){
    var navTabs = $('.nav-tabs');
    var sindex = parseInt(navTabs.index(event.target));
    Session.set('slideIndex', sindex);
    // Session.set('tabIndex', sindex);
    navTabs.removeClass("tab-active");
    navTabs.eq(sindex).addClass("tab-active");
    // console.log("slideIndex from nav-tabs "+ sindex);
  }
});

Template.appLayout.onRendered(function(){
  // Session.setDefault('addVideoModal', false);
  // Session.setDefault('vidsrc', '');
  // Session.setDefault('vidsnaps', []);
  // console.log("Current User " + Meteor.user().profile.name);
});

Template.appLayout.onCreated(function(){
  Session.set('appTitle', 'frolic');
  Session.set('openCircleMenu', false);
  Session.set('openCircleNew', false);
  // Session.set('optsOpen', false);
  var self = this;
  self.autorun(function(){
    self.subscribe("profile", Meteor.userId());
    self.subscribe("hearts", Meteor.userId());
    self.subscribe("circles");
    self.subscribe("profiles");
    self.subscribe("notifications");
    // self.subscribe("fros_fs");
  });
});


// AddFloatBtn: function(){
//   return AddFloatBtn;
// },
// AddVideoModal: function(){
//   return AddVideoModal;
// },
// showVideoModal: function(){
//   return Session.get('addVideoModal');
// },
// vidsnaps: function(){
//   return Session.get('vidsnaps') ? Session.get('vidsnaps'):[];
// },
// FroPop: function(){
//   return FroPop;
// },
// OptsModal: function(){
//   return OptsModal;
// },
// optsOpen: function(){
//   Session.setDefault('optsOpen', false);
//   return Session.get('optsOpen');
// }
