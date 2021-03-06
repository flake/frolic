
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
      {'title': 'Fros', 'iconClass': 'fa fa-heart slidetab-ficon', 'maticon': ''},
      {'title': 'Screens', 'iconClass': 'fa fa-film slidetab-ficon', 'maticon': ''},
      {'title': 'Following', 'iconClass': 'material-icons', 'maticon': 'screen_share'},
      {'title': 'Circle', 'iconClass': 'material-icons', 'maticon': 'account_circle'}
    ]
  },
  slideViews: function(){
    return [
      {'template': 'froList', 'data': {context: "hearted_fros", userId: this.userId}},
      {'template': 'userScreens', 'data': {context: "self", userId: this.userId}},
      {'template': 'userScreens', 'data': {context: "following", userId: this.userId}},
      {'template': 'usersList', 'data': {context: "user_circle", userId: this.userId}}
    ]
  },
  slideIndex: function(){
    return parseInt(Session.get("slideIndex"));
  },
  isCircle: function(){
    var circleMember = CircleMembers.findOne({memberId: this.userId, userId: Meteor.userId()});
    if(circleMember)
      return true;

    return false;
  }
});

Template.profile.onCreated(function(){
  var pdata = Template.parentData(0);
  var self = this;

  self.autorun(function(){
    self.subscribe("profile", pdata.userId);
    self.subscribe("hearted_fros", pdata.userId);
    self.subscribe("user_screens", pdata.userId);
    self.subscribe('circle_member', pdata.userId);
  });
  // console.log("TEMPLATE Created - profile ");
  Session.set("slideIndex", 0);
});

Template.profile.onRendered(function(){
  Session.set('appTitle', "Profile");
  // var vtop = $(window).width() * 2/3 + 48;
  // console.log("profile vtop " + vtop);
});
