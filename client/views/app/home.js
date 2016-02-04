Template.home.helpers({
  fros: function(){
    // console.log("Frolics count: " + Frolics.find().count());
    return Fros.find({}, {sort: {createdAt: -1}});
  },
  FroScreen: function(){
    return FroScreen;
  },
  froFS: function(){
    // console.log("Frolic Id: " + this.froId);
    var froFS = {
      fro: null,
      thumb: null
    };
    var fro = Fros.findOne({}, {sort: {createdAt: -1}});

    if(fro){
      var froFs = FroFS.findOne(fro.fsId)
      froFS.fro = froFs.url();
      froFS.thumb = ThumbFS.findOne(fro.thumb_fs).url();
    }

    return froFS;
  },
  SpaceBar: function(){
    return SpaceBar;
  }
});

Template.home.onRendered(function(){
  Session.set('appTitle', "frolic");
  // console.log("Current user " + Meteor.user());
});

Template.home.onCreated(function(){
  var self = this;
  self.autorun(function(){
    self.subscribe("profile", Meteor.userId());
    self.subscribe("fros_home");
  });
});
