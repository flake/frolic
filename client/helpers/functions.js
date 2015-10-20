onDeviceReady = function(){
  console.log("Device ready: ", navigator.camera);
}

invokePlayer = function(vidfile){
  Session.set("vidsrc", vidfile);
  Session.set("addVideoModal", true);
}

//camera callbacks
camSuccess = function(mediaURI){
  console.log(mediaURI);
  console.log("invoking modal: FILE_URI");

  window.FilePath.resolveNativePath(mediaURI, pathSuccess, handleFail);
}

pathSuccess = function(filepath){
  console.log("filepath success: " + filepath);
  requestFileSystem(TEMPORARY, 0, function(fs){
    var ft = new FileTransfer();
    ft.download("file://"+filepath, fs.root.toURL() + "/frolic.mp4", function(entry){
      var natURL = entry.toNativeURL();
      // console.log("filepath: "+ entry.fullPath);
      console.log("invoking native url: " + natURL);
      window.resolveLocalFileSystemURL(natURL, vidFile, handleFail);
    });
  });

  var options = {
    source: "file://"+filepath,
    countPerMinute: 5,
    timeStamp: true
  }
  window.sebible.videosnapshot.snapshot(snapSuccess, handleFail, options);
}

vidFile = function(fileEntry){
    fileEntry.file(function(file){
      console.log("file Entry "+ file);
      var reader = new FileReader();
      reader.onloadend = function(){
        console.log("file loaded "+this.result);
        var fileURL = (URL || webkitURL).createObjectURL(new Blob([this.result], {type: file.type}));
        invokePlayer(fileURL);
      }
      reader.readAsArrayBuffer(file);
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

handleFail = function(error){
  console.log("handle fail: " + error);
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
