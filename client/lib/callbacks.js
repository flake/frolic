onDeviceReady = function(){
  console.log("Device ready: Capture ", navigator.device.capture);
  console.log("Device ready: Camera ", navigator.camera);
  console.log("Device ready: File ", cordova.file);
  console.log("Device ready: File-Transfer ", FileTransfer);
}

//cordova-plugin-media-capture callbacks
captureSuccess = function(mediaFiles){
  if(mediaFiles.length > 0){
    var path = mediaFiles[0].fullPath;
    console.log("captureSuccess file path: ", path);
  }
}

// cordova-plugin-camera callbacks
camSuccess = function(mediaURI){
  console.log("FILE_URI " + mediaURI);
  window.FilePath.resolveNativePath(mediaURI, pathSuccess, handleFail);
}

pathSuccess = function(filepath){
  console.log("filepath success: " + filepath);
  transcodeVid("file://" + filepath);
  // window.resolveLocalFileSystemURL("file://"+filepath, vidFile, handleFail); // TEMP
  var options = {
    source: "file://"+filepath,
    count: 5,
    timeStamp: true
  }
  window.sebible.videosnapshot.snapshot(snapSuccess, handleFail, options);
}

transcodeVid = function(file){
  VideoEditor.transcodeVideo(
    tranSuccess,
    handleFail,
    {
      fileUri: file,
      outputFileName: 'frolic-temp',
      quality: VideoEditorOptions.Quality.MEDIUM_QUALITY,
      outputFileType: VideoEditorOptions.OutputFileType.MPEG4,
      optimizeForNetworkUse: VideoEditorOptions.OptimizeForNetworkUse.YES,
      // duration: 60,
      saveToLibrary: false
    }
  );
}

//VideoEditor transcode callbacks
tranSuccess = function(result){
  console.log("transcoded video: " + result);
  window.resolveLocalFileSystemURL("file://"+result, vidFile, handleFail);
  // invokePlayer(result);
}

vidFile = function(fileEntry){
    fileEntry.file(function(file){
      console.log("file Entry "+ file);
      var reader = new FileReader();
      reader.onloadend = function(){
        console.log("file loaded "+this.result);
        // var fileURL = (URL || webkitURL).createObjectURL(new Blob([this.result], {type: file.type}));
        invokePlayer(this.result);
      }
      reader.readAsDataURL(file);
    });
}

snapSuccess = function(result){
  if(result && result.result){
    Session.set('vidsnaps', []);
    for(var i in result.snapshots){
      var absfilepath = result.snapshots[i];
      window.resolveLocalFileSystemURL("file://"+result.snapshots[i], resFile, handleFail);
      console.log("img abspath: " + absfilepath);
    }
  }
}

resFile = function(fileEntry){
  fileEntry.file(function(file){
    snapBuffer(file);
  });
}

snapBuffer = function(file){
    var reader = new FileReader(),
    mime = file.type;

    reader.onload = function(e){
      console.log("buffer read");
      var blob = new Blob([e.target.result], {type: mime}),
          url = (URL || webkitURL).createObjectURL(blob),
          vsnaps = Session.get('vidsnaps');
      vsnaps.push(url);
      Session.set('vidsnaps', vsnaps);
    }
    reader.readAsArrayBuffer(file);
}

handleFail = function(e) {
  switch (e.code) {
    case CaptureError.CAPTURE_NO_MEDIA_FILES:
      console.log('CaptureError');
      break;
    case FileError.QUOTA_EXCEEDED_ERR:
      console.log('QUOTA_EXCEEDED_ERR');
      break;
    case FileError.NOT_FOUND_ERR:
      console.log('NOT_FOUND_ERR');
      break;
    case FileError.SECURITY_ERR:
      console.log('SECURITY_ERR');
      break;
    case FileError.INVALID_MODIFICATION_ERR:
      console.log('INVALID_MODIFICATION_ERR');
      break;
    case FileError.INVALID_STATE_ERR:
      console.log('INVALID_STATE_ERR');
      break;
    default:
      console.log('handleFail ' + JSON.stringify(e));
      break;
  }
}
