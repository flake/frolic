
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
        console.log("FS Error: ScreensFS insert failed: " + err);
      }else{
        if(Session.get('screen-fsid')){
          // **TODO** verify
          console.log("previous fs record exists... " + Session.get('screen-fsid'));
          ScreensFS.remove(Session.get('screen-fsid'));
        }
        Session.set("screen-fsid", fileObj._id);
      }
    });
  },

  "click #screen-submit": function(event, template){
    console.log("screen form submit...");

    var screen = {
      title: template.find('#screen-title').value,
      description: template.find('#screen-desc').value,
      cover_photo: Session.get('screen-fsid')
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
  Session.setDefault('screen-fsid', null);
});
