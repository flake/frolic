Template.home.helpers({
  fros: function(){
    // console.log("Frolics count: " + Frolics.find().count());
    return Fros.find({}, {sort: {createdAt: -1}});
  },
  SpaceBar: function(){
    return SpaceBar;
  }
});

Template.home.onRendered(function(){
  // console.log("Current user " + Meteor.user());
});

Template.home.onCreated(function(){
  var self = this;
  self.autorun(function(){
    self.subscribe("profile", Meteor.userId());
    self.subscribe("fros_home");
  });
});
