
Template.appLayout.helpers({
  AppHead: function(){
    return AppHead;
  },
  title: function(){
    return Session.get('appTitle');
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
  create: function(){

  },
  rendered: function(){

  },
  destroyed: function(){

  },
});

Template.appLayout.events({
  "click #cam-record": function(event, template){
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
      navigator.camera.getPicture(camSuccess, camFail, {
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
    console.log("input file: " + file);
    //if(vid.canPlayType(file.type) != ''){
      processFile(file);
    //}else{
      // console.log("This video file format is not supported");
    // }
    //readAsBuffer(event.currentTarget); // **TODO** assign worker
    //readAsData(event.currentTarget);
    //window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, failrequestFileSystem);
  }
});
