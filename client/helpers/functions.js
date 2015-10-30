onDeviceReady = function(){
  // window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
  // window.requestFileSystem(window.TEMPORARY, 8 * 1024 * 1024 /*16MB*/ , handleInit, handleFail);

  console.log("Device ready: ", navigator.camera);
}

//var fileSystem;

handleInit = function(fileSystem){
  window.fileSystem = fileSystem;
  console.log("init fileSystem: " + window.fileSystem.name);
}

readFromFile = function(fullpath){
  window.fileSystem.root.getFile(fullpath, {}, function(fileEntry){
    console.log("gotFile");
    fileEntry.file(function(file){
      console.log("fileEntry");
      var reader = new FileReader();
      reader.onloadend = function(){
        console.log("file loaded " + this.result);
        var fileURL = (URL || webkitURL).createObjectURL(new Blob([this.result], {type: file.type}));
        console.log("fileURL " + fileURL);
        invokePlayer(fileURL);
      }

      reader.readAsArrayBuffer(file);
    }, handleFail);
  }, handleFail);
}

invokePlayer = function(vidfile){
  Session.set("vidsrc", vidfile);
  Session.set("addVideoModal", true);
}

//camera callbacks
camSuccess = function(mediaURI){
  console.log("FILE_URI " + mediaURI);
  window.FilePath.resolveNativePath(mediaURI, pathSuccess, handleFail);
}

pathSuccess = function(filepath){
  console.log("filepath success: " + filepath);
  transcodeVid("file://" + filepath);
  var options = {
    source: "file://"+filepath,
    countPerMinute: 5,
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

//VideoEditor transcode callbacks
tranSuccess = function(result){
  console.log("transcoded video: " + result);
  window.resolveLocalFileSystemURL("file://"+result, vidFile, handleFail);
  // invokePlayer(result);
}

handleFail = function(e) {
  switch (e.code) {
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
      console.log('Unknown error ' + JSON.stringify(e));
      break;
  }
}

processFile = function(file){
  var fileURL = (URL || webkitURL).createObjectURL(file);
  var options = {
    source: fileURL,
    countPerMinute: 5,
    timeStamp: true
  }
  window.sebible.videosnapshot.snapshot(snapSuccess, handleFail, options);
  //Session.set("vidsrc", url);
  invokePlayer(fileURL);
  console.log("fileURL: " + fileURL);
}

var getFileBlob = function (url, cb) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.responseType = "blob";
        xhr.addEventListener('load', function() {
            cb(xhr.response);
        });
        xhr.send();
};

var blobToFile = function (blob, name) {
        blob.lastModifiedDate = new Date();
        blob.name = name;
        return blob;
};

var getFileObject = function(filePathOrUrl, cb) {
       getFileBlob(filePathOrUrl, function (blob) {
          cb(blobToFile(blob, 'frolic.mp4'));
       });
};
