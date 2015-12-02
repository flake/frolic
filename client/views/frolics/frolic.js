
Template.frolic.helpers({
  create: function(){

  },
  rendered: function(){
  },
  destroyed: function(){

  },

  FroScreen: function(){
    return FroScreen;
  },
  frolicDoc: function(){
    // console.log("frolic doc Id: " + this.frolicId);
    // var frolic = Frolics.findOne(this.frolicId);
    // console.log("frolic object " + typeof(frolic));
    // prettyJSON(frolic);
    return Frolics.findOne(this.frolicId);
  },
  frolicFS: function(){
    console.log("Frolic Id: " + this.frolicId);
    var frolic = Frolics.findOne(this.frolicId);
    if(frolic)
    return FrolicsFS.findOne({_id: frolic.fsId});
    else {
      return null;
    }
  },
  FroTabs: function(){
    return FroTabs;
  },
  tabIndex: function(){
    return parseInt(Session.get('tabIndex'));
  },
  slideIndex: function(){
    return parseInt(Session.get('slideIndex'));
  },
  heartedClass: function(){
    var frolic = Frolics.findOne(this.frolicId);
    console.log("frolic hearted... " + frolic.isHearted());
    return frolic.isHearted() ? "heart" : "heart-o";
  }
});

Template.frolic.events({
  "click #foo": function(event, template){

  }
});

// Template.frolic.rendered = function(){
//   Session.set('tabIndex', 0);
//   Session.set('slideIndex', 0);
// }

Template.frolic.onRendered(function(){
  console.log("frolic rendered...");
  // Session.setDefault('tabIndex', 0);
  Session.setDefault('slideIndex', 0);

  Tracker.autorun(function(){
    var ftindex = Session.get('slideIndex');
    var navTabs = $('.nav-tabs');
    navTabs.removeClass("tab-active");
    navTabs.eq(ftindex).addClass("tab-active");
  });
});

Template.frolic.onCreated(function(){
  var pdata = Template.parentData(0);
  var self = this;
  console.log("frolic on-created _id: "+pdata.frolicId);
  self.autorun(function(){
    self.subscribe("frolic", pdata.frolicId);
    self.subscribe("comments", pdata.frolicId);
  });
});
