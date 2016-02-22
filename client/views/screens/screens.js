
Template.screens.helpers({
  ScreensPanel: function(){
    return ScreensPanel;
  },
  SlideTabs: function(){
    return SlideTabs;
  },
  SwipeSlides: function(){
    return SwipeSlides;
  },
  slideTabs: function(){
    return [
      {'title': 'My Screens', 'iconClass': 'fa fa-laptop slidetab-ficon', 'maticon': ''},
      {'title': 'Following', 'iconClass': 'material-icons', 'maticon': 'screen_share'}
    ]
  },
  slideViews: function(){
    return [
      {'template': 'userScreens', 'data': {context: "self", userId: Meteor.userId()}},
      {'template': 'userScreens', 'data': {context: "following", userId: Meteor.userId()}}
    ]
  },
  slideIndex: function(){
    return parseInt(Session.get("slideIndex"));
  }
});

Template.screens.onCreated(function(){
  Session.set('appTitle', 'Screens');
  Session.set('slideIndex', 0);
  var self = this;
  self.autorun(function(){
    self.subscribe('user_screens', Meteor.userId());
  });
});

Template.screens.onRendered(function(){
  $('.cover-views').css('top', "208px");
});
