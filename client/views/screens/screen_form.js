
Template.screenForm.helpers({
  ScreenForm: function(){
    return ScreenForm;
  },
  screen: function(){
    if(this.screenId){
      return Screens.findOne(this.screenId);
    }

    return undefined;
  }
});

Template.screenForm.events({
  "change #screen-upload": function(event, template){
    var ifile = event.target.files[0];
    console.log("screen-upload changed " + ifile);

    ScreensFS.insert(ifile, function(err, fileObj){
      if(err){
        console.log("FS Error: ScreensFS insert failed: " + err);
      }else{
        if(Session.get('screen-fsid')){
          // **TODO** verify
          console.log("previous fs record exists... " + Session.get('screen-fsid'));
          ScreensFS.remove(Session.get('screen-fsid'));
        }
        Session.set("screen-fsid", fileObj._id);
        // Session.set("upload-url", fileObj.url());
      }
    });
  },

  "click #screen-submit": function(event, template){
    console.log("screen form submit...");

    var screen = {
      title: template.find('#screen-title').value,
      description: template.find('#screen-desc').value,
      cover_photo: Session.get('screen-fsid'),
      avatar_photo: Session.get('avatar-fsid')
    };

    Meteor.call('addScreen', screen, function(err, response){
      if(err){
        console.log("Error adding new Screen: " + err);
      }else{
        console.log("Screen added success... " + response);

        //form clean up
        template.find('#screen-title').value = '';
        template.find('#screen-desc').value = '';
        Session.set('screen-fsid', null);

        FlowRouter.go('/screen/'+response);
      }
    });
  }
});

Template.screenForm.onCreated(function(){
  Session.set('screen-fsid', undefined);
  Session.set('avatar-fsid', undefined);
});
