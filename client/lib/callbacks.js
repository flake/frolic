
onDeviceReady = function(){
  console.log("Device ready: Capture ", navigator.device.capture);
  console.log("Device ready: Camera ", navigator.camera);
  console.log("Device ready: File ", cordova.file);
  console.log("Device ready: File-Transfer ", FileTransfer);

  outFilePath = '';
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
  transStart = new Date();
  window.FilePath.resolveNativePath(mediaURI, pathSuccess, handleFail);
}

pathSuccess = function(filepath){
  console.log("filepath success: " + filepath);
  FroTrans.showToast("I am there!", 0);
  FroTrans.open(filepath);

  // ffmpegTrans(filepath);
  // froSnaps(filepath);
}

ffmpegTrans = function(filepath){
  var outPath = cordova.file.applicationStorageDirectory;
  var outFile = 'frolic.mp4';
  createOutputFile(outPath, outFile, function(fileEntry){
    if(!fileEntry){
      console.log("Error creating file");
      return;
    }

    var outFilePath = fileEntry.toURL().replace('file://', '');

    // '-vf', 'scale=-1:480',
    // '-b:a', '128k',
    // '-profile:', 'main',
    // '-frames:v', '24',
    // '-maxrate', '128k',
    // '-bufsize', '1000k'
    // '-vf', 'fps=fps=128',
    // '-codec:a', 'cop

    var cmd = [
      '-y',
      '-i', filepath,
      '-codec:v', 'libx264',
      '-preset', 'ultrafast',
      '-b:v', '96k',
      '-maxrate', '128k',
      '-bufsize', '256k',
      '-crf', '32',
      '-vf', "scale=-1:'min(ih,240)'",
      '-threads', '0',
      '-codec:a', 'copy',
      '-r', '24',
      '-b:a', '24k',
      outFilePath ];

    FroTrans.ffmpeg(froSuccess, froFail, {
      cmd: cmd,
      out: outFilePath
    });
  });
}

froSuccess = function(froPath){
  console.log("FroTrans success: ", froPath);

  transEnd = new Date();
  var labs = (transEnd.getTime() - transStart.getTime()) / 1000;
  console.log("FroTrans run: ", labs);

  var cmd = ['-i', froPath];
  // FroTrans.ffmpeg(function(){}, function(){}, {cmd:cmd});

  window.resolveLocalFileSystemURL("file://"+froPath, froReady, handleFail);
}

froReady = function(fileEntry){
    fileEntry.file(function(fileObj){
      console.log("FroTrans fro size: "+ (fileObj.size)/1024);
      var reader = new FileReader();
      reader.onloadend = function(){
        console.log("file loaded "+this.result);
        // var fileURL = (URL || webkitURL).createObjectURL(new Blob([this.result], {type: file.type}));
        invokePlayer(this.result);
      }
      reader.readAsDataURL(fileObj);
    });
}

froFail = function(error){
  console.log("FroTrans error ", error);
  FroTrans.showToast("Fro Trans failed!", 0);
}

// this helper function creates a file at a provided path using the cordova-file plugin
// you can pass cordova.file.cacheDirectory, cordova.file.externalRootDirectory, etc.
function createOutputFile(path, fileName, cb) {
  window.requestFileSystem(window.PERSISTENT, 16*1024*1024,
      function(fs) {
          window.resolveLocalFileSystemURL(path,
              function(dirEntry) {
                  dirEntry.getFile(fileName, { create: true, exclusive: false }, function(fileEntry) {
                      console.log('successfully created file');
                      return cb(fileEntry);
                  }, function(err) {
                      console.log('error creating file, err: ' + err);
                      return cb(null);
                  });
              },
              function(err) {
                  console.log('error finding specified path, err: ' + err);
                  return cb(null);
              }
          );
      },
      function(err) {
          console.log('error accessing file system, err: ' + err);
          return cb(null);
      }
  );
}


froSnaps = function(filepath){
  var options = {
    source: "file://"+filepath,
    count: 5,
    timeStamp: true
  }
  window.sebible.videosnapshot.snapshot(snapSuccess, handleFail, options);
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

//VideoEditor transcode callbacks
tranSuccess = function(result){
  console.log("transcoded video: " + result);
  // window.resolveLocalFileSystemURL("file://"+result, vidFile, handleFail);
  // invokePlayer(result);
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
