
Template.screenForm.helpers({
  create: function(){

  },
  rendered: function(){

  },
  destroyed: function(){

  },

  ScreenForm: function(){
    return ScreenForm;
  },
  screen: function(){
    if(this.screenId){
      return Screens.findOne(this.screenId);
    }

    return null;
  }
});

Template.screenForm.events({
  "change #screen-upload": function(event, template){
    var ifile = event.target.files[0];
    console.log("screen-upload changed " + ifile);

    ScreensFS.insert(ifile, function(err, fileObj){
      if(err){
        console.log("FS Error: ScreenFS insert failed: " + err);
      }else{
        if(Session.get('screen-fsid')){
          // **TODO** verify
          ScreenFS.remove(Session.get('screen-fsid'));
        }
        Session.set("screen-fsid", fileObj._id);
      }
    });
  },

  "click #screen-submit": function(event, template){
    console.log("screen form submit...");

    var screen = {
      title: template.find('#screen-title').value,
      cover_photo: Session.get('screen-fsid')
    };

    Meteor.call('addScreen', screen, function(err){
      if(err){
        console.log("Error adding new Screen: " + err);
      }else{
        console.log("Screen added success...");

        //clean up
        template.find('#screen-title').value = '';
        Session.set('screen-fsid', null);
      }
    });
  }
});

Template.screenForm.onCreated(function(){
  Session.setDefault('screen-fsid', null);
});
