
Template.profile.helpers({
  ProHead: function(){
    return ProHead;
  },
  user: function(){
    return Meteor.users.findOne(this.userId);
  },
  SlideTabs: function(){
    return SlideTabs;
  },
  SwipeSlides: function(){
    return SwipeSlides;
  },
  slideTabs: function(){
    return [
      {'title': 'Info', 'iconClass': 'material-icons', 'maticon': 'person'},
      {'title': 'Fros', 'iconClass': 'fa fa-heart slidetab-ficon', 'maticon': ''},
      {'title': 'Screens', 'iconClass': 'fa fa-film slidetab-ficon', 'maticon': ''},
      {'title': 'Circle', 'iconClass': 'material-icons', 'maticon': 'account_circle'}
    ]
  },
  slideViews: function(){
    return [
      {'template': 'demo', 'data': {demoText: "slide 01"}},
      {'template': 'froList', 'data': {context: "hearted_fros", userId: this.userId}},
      {'template': 'userScreens', 'data': {userId: this.userId}},
      {'template': 'demo', 'data': {demoText: "slide 04"}}
    ]
  },
  slideIndex: function(){
    return parseInt(Session.get("slideIndex"));
  }
});

Template.profile.onCreated(function(){
  var pdata = Template.parentData(0);
  var self = this;

  self.autorun(function(){
    self.subscribe("profile", pdata.userId);
    self.subscribe("hearted_fros", pdata.userId);
    self.subscribe("user_screens", pdata.userId);
  });
  Session.setDefault("slideIndex", 0);
});

Template.profile.onRendered(function(){
  var vtop = Session.get('win-width') * 2/3 + 48;
  console.log("profile vtop " + vtop);
  this.$('.cover-views').css("top", vtop);
});