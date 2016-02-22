
Template.circles.helpers({
  CirclePanel: function(){
    return CirclePanel;
  },
  MyCircles: function(){
    return MyCircles;
  },
  circles: function(){
    return Circles.find({userId: Meteor.userId()}).fetch();
  }
});

Template.circles.onRendered(function(){
  Session.set('appTitle', 'Circles');
});

Template.circles.onCreated(function(){
  var self = this;
  self.autorun(function(){
    self.subscribe('circles');
  });
});
