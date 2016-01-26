
Template.froNew.helpers({
  FroScreen: function(){
    return FroScreen;
  },
  FroNew: function(){
    return FroNew;
  },
  frosrc: function(){
    return Session.get('newFro');
  },
  screens: function(){
    return Screens.find({creator_id: Meteor.userId()}).fetch();
  }
  // snaps: function(){
  //   return Session.get('vidsnaps') ? Session.get('vidsnaps'):[];
  // }
});

Template.froNew.events({
  'click .frolic-upload': function(event, template){
    var froPublish = ($(event.currentTarget).attr('id') === "frolic-publish") ? true : false;
    console.log("forlic clicked for upload: " + froPublish);
    var fro = {
      fsId: Session.get('newFro'),
      title: template.find('#fro-title').value,
      description: template.find('#fro-desc').value,
      screenId: template.find('#fro-screen').value
    }

    console.log("fro obj: " + prettyJSON(fro));

    Meteor.call('addFro', fro, function(error, froId){
      if(error){
        console.log("ERROR: "+error.message);
      }else{
        FlowRouter.go('/fro/'+froId);
        console.log("fro add success... " + froId);
      }
    });
  }
});

Template.froNew.onCreated(function(){
  var self = this;
  self.autorun(function(){
    self.subscribe("user_screens", Meteor.userId()) ;
  });
});
