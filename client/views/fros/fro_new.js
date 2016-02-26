
Template.froNew.helpers({
  FroScreen: function(){
    return FroScreen;
  },
  FroNew: function(){
    return FroNew;
  },
  ScreenDialog: function(){
    return ScreenDialog;
  },
  dialogOpen: function(){
    return Session.get('screenDialog');
  },
  froSrc: function(){
    var froFS = FroFS.findOne(Session.get('newFro'));
    if(froFS)
      return froFS.url();

    return null;
  },
  thumbSrc: function(){
    var thmFS = ThumbFS.findOne(Session.get('newThumb'));
    if(thmFS)
      return thmFS.url();

    return null;
  },
  screens: function(){
    return Screens.find({creator_id: Meteor.userId()}, {sort: {createdAt: -1}}).fetch();
  }
  // snaps: function(){
  //   return Session.get('vidsnaps') ? Session.get('vidsnaps'):[];
  // }
});

Template.froNew.events({
  'click .frolic-upload': function(event, template){
    var froPublish = ($(event.currentTarget).attr('id') === "frolic-publish") ? true : false;
    console.log("forlic clicked for upload: " + froPublish);

    if(template.find("#fro-title").value === ""){
      FroActions.alert("Give a title to your fro");
      return;
    }

    var screenId = template.find('#fro-screen').value;
    if((screenId === undefined) || (screenId === "0")){
      FroActions.alert("Add a screen to publish your fro.");
      return;
    }

    // var isValid = ValidateForm.validate('#fro-new-form');
    // if(!isValid){
    //   return;
    // }

    var fro = {
      fsId: Session.get('newFro'),
      thumb_fs: Session.get('newThumb'),
      title: template.find('#fro-title').value,
      description: template.find('#fro-desc').value,
      screenId: screenId
    }

    // console.log("fro obj: " + prettyJSON(fro));
    FlowRouter.go("/loading");
    Meteor.call('addFro', fro, function(error, froId){
      if(error){
        console.log("ERROR: addFro - "+error.message);
      }else{
        Session.set('newFro', null);
        FlowRouter.go('/fro/'+froId);
        // console.log("fro add success... " + froId);
      }
    });
  }
});

Template.froNew.onCreated(function(){
  Session.set('screenDialog', false);
  var self = this;
  self.autorun(function(){
    self.subscribe("user_screens", Meteor.userId());
    // self.subscribe("fro_fs", Session.get('newFro'));
    self.subscribe("thumb_fs", Session.get('newThumb'));
  });
});

Template.froNew.onDestroyed(function(){
  Session.set('newFro', null);
  Session.set('newThumb', null);
});
