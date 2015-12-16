
Template.appLayout.helpers({
  AppHead: function(){
    return AppHead;
  },
  title: function(){
    return Session.get('appTitle');
  },
  navIcons: function(){
    return Session.get('navIcons');
  },
  sideNav: function(){
    return Session.get('sideNav');
  },
  AddFloatBtn: function(){
    return AddFloatBtn;
  },
  AddVideoModal: function(){
    return AddVideoModal;
  },
  showVideoModal: function(){
    return Session.get('addVideoModal');
  },
  vidsrc: function(){
    return Session.get('vidsrc');
  },
  vidsnaps: function(){
    return Session.get('vidsnaps') ? Session.get('vidsnaps'):[];
  }
});

Template.appLayout.events({
  "click #frolic-videocam": function(event, template){
    // if(Meteor.isCordova){
    //   console.log("capture cam initialized...");
    //   navigator.device.capture.captureVideo(captureSuccess, captureError, {limit:1, duration: 60});
    // }else{
    //   console.log("camrec clicked");
    //   invokePlayer("/skirtups.mp4");
    // }
    invokePlayer("/catrev.mp4");
  },

  "click #cam-roll": function(event, template){
      // $('#float_add').click();
    if(Meteor.isCordova){
      console.log("camroll initialized...");
      navigator.camera.getPicture(camSuccess, handleFail, {
        // destinationType: Camera.DestinationType.FILE_URL,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        mediaType: Camera.MediaType.VIDEO
      });
    }else{
      console.log("camroll clicked");
      invokePlayer("/catrev.mp4");
    }
  },

  'change #float_add': function(event, template){
    console.log("camroll change...");
    //invokePlayer('');
    //var vid = document.querySelector('#add-video-player');
    var file = event.currentTarget.files[0];
    console.log("input file: " + file.fullPath);
    //if(vid.canPlayType(file.type) != ''){
      processFile(file);
    //}else{
      // console.log("This video file format is not supported");
    // }
    //readAsBuffer(event.currentTarget); // **TODO** assign worker
    //readAsData(event.currentTarget);
    //window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, failrequestFileSystem);
  },

  'click .frolic-upload': function(event, template){
    var froPublish = ($(event.currentTarget).attr('id') === "frolic-publish") ? true : false;
    console.log("forlic clicked for upload: " + froPublish);

    var fsFile = new FS.File(Session.get('vidsrc'));
    fsFile.owner = Meteor.userId();
    FrolicsFS.insert(fsFile, function (err, fileObj) {
      if (err) throw err;
      else {
        Session.set('addVideoModal', false);
        console.log("file upload success: "+ JSON.toString(fileObj));
        var fro = {
          fsId: fileObj._id,
          title: template.find('#fro-title').value,
          tagline: template.find('#fro-tagline').value
        }

        console.log("fro obj: " + JSON.toString(fro));

        Meteor.call('addFro', fro, function(error, froId){
          if(error){
            throwError(error.reason);
            console.log("ERROR: "+error.message);
          }else{
            // clean up
            console.log("fro add success... " + froId);
          }
        })
      }
    });
  },

  'click #navigation-back': function(event, template){
    console.log("back btn event...");
    history.back();
    // FlowRouter.go('/');
    // BackBehaviour.goBack();
  },

  'click #navicon-right': function(event, template){
    Session.set("sideNav", !Session.get("sideNav"));
  },

  'click .nav-tabs': function(event, template){
    var navTabs = $('.nav-tabs');
    var sindex = parseInt(navTabs.index(event.target));
    Session.set('slideIndex', sindex);
    // Session.set('tabIndex', sindex);

    navTabs.removeClass("tab-active");
    navTabs.eq(sindex).addClass("tab-active");

    console.log("slideIndex from nav-tabs "+ sindex);
  }
});

Template.appLayout.onRendered(function(){
  devHeight = $(window).innerHeight();
  $('#app-body').css('min-height', devHeight);

  Session.setDefault('addVideoModal', false);
  Session.setDefault('vidsrc', '');
  Session.setDefault('vidsnaps', []);
});

Template.appLayout.onCreated(function(){
  Session.setDefault('appTitle', 'frolic');
  var self = this;
  self.autorun(function(){
    self.subscribe("fros_fs");
    self.subscribe("hearts", Meteor.userId());
    self.subscribe("profiles");
  });
  Session.set("win-height", $(window).height());
  Session.set("win-width", $(window).width());
});
