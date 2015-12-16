
Template.screenProfile.helpers({
  UserCard: function(){
    return UserCard;
  },
  creator: function(){
    console.log("screen profile Id: " + this.screenId);
    var screen = Screens.findOne(this.screenId);
    console.log("screen creator " + prettyJSON(screen.creator()));
    return screen.creator();
  }
});

Template.screenProfile.events({
  "click #foo": function(event, template){

  }
});

Template.screenProfile.onCreated(function(){
  // var pdata = Template.parentData(0);
  // var self = this;
  //
  // self.autorun(function(){
  //   self.subscribe("screen", pdata.screenId);
  //   self.subscribe("profiles");
  // });
});
