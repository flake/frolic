FroActions = {
  whatsapp: function(fro){
    var msg = 'a fro via frolic\n';
    var img = fro.thumbSrc(); /* img */
    var url = "http://frolicplay.com/" + fro._id; /* url */
    var whatsUp = function(){
      console.log('share ok');
    };
    var whatsFail = function(errormsg){
      console.log(errormsg);
    };
    window.plugins.socialsharing.shareViaWhatsApp(msg, img, url, whatsUp, whatsFail);
  },

  nativeShare: function(fro){
    // console.log("social share handle... ");
    var msg = 'a fro via frolic\n';
    var img = fro.thumbSrc(); /* img */
    var url = "http://frolicplay.com/"+fro._id; /* url */
    var whatsUp = function(){
      console.log('share ok');
    };
    var whatsFail = function(errormsg){
      console.log(errormsg);
    };
    window.plugins.socialsharing.share(null, null, url, whatsUp, whatsFail);
  },

  renderSwipes: function(){
    var vtop = $('.cover-fixed').height();
    $('.cover-views').css("top", vtop);
  },

  alert: function(message){
    Session.set('openFroSpinner', false);
    Session.set('froMessage', message);
    Session.set('openFroDialog', true);
  },

  progress: function(show, message){
    var msg = (message) ? message : 'Loading...';
    Session.set('spinMessage', msg);
    Session.set('openFroSpinner', show);
  }

  // record: function(){
  //   if(Meteor.isCordova){
  //     console.log("capture cam initialized...");
  //     navigator.device.capture.captureVideo(captureSuccess, handleFail, {limit:1, duration: 60});
  //   }
  // },
  // upload: function(){
  //   console.log("I am upload action...");
  //   if(Meteor.isCordova){
  //     console.log("upload from gallery initialized...");
  //     navigator.camera.getPicture(camSuccess, handleFail, {
  //       // destinationType: Camera.DestinationType.FILE_URL,
  //       sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
  //       mediaType: Camera.MediaType.VIDEO
  //     });
  //   }
  // }
}
