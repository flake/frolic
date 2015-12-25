FroActions = {
  record: function(){
    if(Meteor.isCordova){
      console.log("capture cam initialized...");
      navigator.device.capture.captureVideo(captureSuccess, handleFail, {limit:1, duration: 60});
    }
  },
  upload: function(){
    if(Meteor.isCordova){
      console.log("upload from gallery initialized...");
      navigator.camera.getPicture(camSuccess, handleFail, {
        // destinationType: Camera.DestinationType.FILE_URL,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        mediaType: Camera.MediaType.VIDEO
      });
    }
  }
}
