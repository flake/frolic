Template.home.helpers({
  fros: function(){
    // console.log("Frolics count: " + Frolics.find().count());
    return Fros.find({}, {sort: {createdAt: -1}});
  },
  SpaceBar: function(){
    return SpaceBar;
  },
  rendered: function(){

  }
});

Template.home.onCreated(function(){
  var self = this;
  self.autorun(function(){
    self.subscribe("fros_home");
  });
});
