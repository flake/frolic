
Template.screenForm.helpers({
  ScreenForm: function(){
    return ScreenForm;
  },
  screen: function(){
    if(this.screenId){
      var screen = Screens.findOne(this.screenId);
      if(screen){
        Session.set('screen-fsid', screen.cover_photo);
        Session.set('avatar-fsid', screen.avatar_photo);
        return screen;
      }
    }

    return undefined;
  },
  action: function(){
    return (this.screenId) ? 'edit' : 'new';
  }
});

Template.screenForm.events({
  // "change #screen-upload": function(event, template){
  //   var ifile = event.target.files[0];
  //   console.log("screen-upload changed " + ifile);
  //
  //   ScreensFS.insert(ifile, function(err, fileObj){
  //     if(err){
  //       console.log("FS Error: ScreensFS insert failed: " + err);
  //     }else{
  //       if(Session.get('screen-fsid')){
  //         // **TODO** verify
  //         console.log("previous fs record exists... " + Session.get('screen-fsid'));
  //         ScreensFS.remove(Session.get('screen-fsid'));
  //       }
  //       Session.set("screen-fsid", fileObj._id);
  //       // Session.set("upload-url", fileObj.url());
  //     }
  //   });
  // },

  "click #screen-submit": function(event, template){
    console.log("screen form submit...");

    var screen = {
      title: template.find('#screen-title').value,
      description: template.find('#screen-desc').value,
      cover_photo: Session.get('screen-fsid'),
      avatar_photo: Session.get('avatar-fsid')
    };

    var sid = template.find('#screen-id').value;

    if(sid && sid !== ''){
      screen._id = sid;
    }

    Meteor.call('saveScreen', screen, function(err, response){
      if(err){
        console.log("Error adding new Screen: " + err);
      }else{
        console.log("Screen added success... " + response);
        //form clean up
        template.find('#screen-title').value = '';
        template.find('#screen-desc').value = '';
        Session.set('screen-fsid', null);
        if(Session.get('newFro')){
          FlowRouter.go('/fro/new');
        }else{
          FlowRouter.go('/screen/'+response);
        }
      }
    });
  }
});

Template.screenForm.onCreated(function(){
  Session.set('screen-fsid', undefined);
  Session.set('avatar-fsid', undefined);

  var pdata = Template.parentData(0);
  var self = this;

  if(pdata){
    self.autorun(function(){
      self.subscribe("screen", pdata.screenId);
    });
  }
});
