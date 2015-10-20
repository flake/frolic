onDeviceReady = function(){
  console.log("Device ready: ", navigator.camera);
}

invokePlayer = function(vidfile){
  Session.set("vidsrc", vidfile);
  Session.set("addVideoModal", true);
}

//capture callbacks
captureError = function(error){
  //navigator.notification.alert('ERROR:' + error.message, null, "Capture Error");
}

captureSuccess = function(mediaFiles){
  var i, path, len;
  path = mediaFiles[0].fullPath;
  console.log("camrec path: ", path);
  invokePlayer(path);
/*  for(i=0, len=mediaFiles.length; i<len; i++){
    path = mediaFiles[i].fullPath;
    //upload to S3
    console.log("path= "+path);
  }*/
}

//camera callbacks
camSuccess = function(mediaURI){
  console.log(mediaURI);
  console.log("invoking modal: FILE_URI");

  //mediaURI = mediaURI.replace("%", "%25");
  //mediaURI = mediaURI.replace("content", "file");
  // readFile(mediaURI);
  // console.log(Session.get('video_url'));
  // window.resolveLocalFileSystemURL(mediaURI, vidFile, resFail);

   window.FilePath.resolveNativePath(mediaURI, pathSuccess, pathError);
  //  invokePlayer(mediaURI);
  // Session.set("vidsrc", mediaURI);
}

camFail = function(message){
  console.log("camroll failed: ", message);
}

pathSuccess = function(filepath){
  console.log("filepath success: " + filepath);
  requestFileSystem(TEMPORARY, 0, function(fs){
    var ft = new FileTransfer();
    ft.download("file://"+filepath, fs.root.toURL() + "/frolic.mp4", function(entry){
      var natURL = entry.toNativeURL();
      console.log("filepath: "+ entry.fullPath);
      // console.log("toURL: "+ entry.toURL());
      console.log("invoking native url: " + natURL);
      window.resolveLocalFileSystemURL(natURL, vidFile, resFail);
    });
  });
  // var ft = new FileTransfer();
  // ft.upload(filepath, encodeURI(''))
  // VideoPlayer.play("file://"+filepath);
  //invokePlayer("file://"+filepath);
  // window.resolveLocalFileSystemURL("file://"+filepath, vidFile, resFail);

  var options = {
    source: "file://"+filepath,
    countPerMinute: 5,
    timeStamp: true
  }
  window.sebible.videosnapshot.snapshot(snapSuccess, snapFail, options);
  // VideoEditor.transcodeVideo(
  //   tranSuccess,
  //   tranError,
  //   {
  //     fileUri: "file://" + filepath,
  //     outputFileName: 'frolic-temp',
  //     quality: VideoEditorOptions.Quality.MEDIUM_QUALITY,
  //     outputFileType: VideoEditorOptions.OutputFileType.MPEG4,
  //     optimizeForNetworkUse: VideoEditorOptions.OptimizeForNetworkUse.YES,
  //     // duration: 60,
  //     saveToLibrary: false
  //   }
  // );
}

pathError = function(error){
  console.log("filepath error: ", error);
}

//VideoEditor transcode callbacks
tranSuccess = function(result){
  console.log("transcoded video: " + result);
  window.resolveLocalFileSystemURL("file://"+result, vidFile, resFail);
  // invokePlayer(result);
}

tranError = function(error){
  console.log("transcoded error: " + error);
}

readAsData = function(input){
  if(input.files && input.files[0]){
    var reader = new FileReader();
    var file = input.files[0];

    console.log("readfile input: ");
    reader.onload = function(e){
      console.log("read file invoke...");
      //invokePlayer(e.target.result);
      Session.set('vidsrc', e.target.result);
      //console.log("read video url: ", Session.get('vidsrc'));
    }

    if(file)
      reader.readAsDataURL(file);
    else
      console.log("not a file");
  }
}

readAsBuffer = function(file){
    var reader = new FileReader(),
    mime = file.type;

    // reader.onload = callback;

    reader.onload = function(e){
      console.log("buffer read");
      var blob = new Blob([e.target.result], {type: mime}),
          url = (URL || webkitURL).createObjectURL(blob);

          var vsnaps = Session.get('vidsnaps');
          vsnaps.push(url);
          Session.set('vidsnaps', vsnaps);
          // console.log("vidsrc set");
    }
    reader.readAsArrayBuffer(file);
}

processFile = function(file){
  var fileURL = (URL || webkitURL).createObjectURL(file);
  var options = {
    source: fileURL,
    countPerMinute: 5,
    timeStamp: true
  }
  window.sebible.videosnapshot.snapshot(snapSuccess, snapFail, options);
  //Session.set("vidsrc", url);
  invokePlayer(fileURL);
  console.log("fileURL: " + fileURL);
}

snapSuccess = function(result){
  if(result && result.result){
    Session.set('vidsnaps', []);
    for(var i in result.snapshots){
      var absfilepath = result.snapshots[i];
      window.resolveLocalFileSystemURL("file://"+result.snapshots[i], resFile, resFail);
      console.log("img abspath: " + absfilepath);
      //set img
    }
  }
}
snapFail = function(error){
  console.log("snap error: " + error);
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

handleError = function(err){
  console.log("handleError " + err.code);
}

// vidFile = function(fileEntry){
//   fileEntry.file(function(file){
//     console.log("fileEntry file: " + JSON.stringify(file));
//     var reader = new FileReader(),
//     mime = file.type;
//     console.log("file type: " + mime);
//     // var blob = new Blob([file], {type: mime});
//     // var fileURL = (URL || webkitURL).createObjectURL(file);
//     // invokePlayer(fileURL);
//
//     reader.onload = function(e){
//       console.log("vid buffer read " + e.target.result);
//         var blob = new Blob([new Uint8Array(e.target.result)], {type: mime}),
//             url = (URL || webkitURL).createObjectURL(blob);
//          invokePlayer(url);
//         // console.log("vidsrc set");
//     }
//     reader.readAsArrayBuffer(file);
//   })
// }

resFile = function(fileEntry){
  fileEntry.file(function(file){
    readAsBuffer(file);
  });
}

resFail = function(error){
  console.log("FileSystem error");
  console.dir(error);
}

//window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, failrequestFileSystem);

gotFS = function(fileSystem) {
  console.log("gotFS called...", fileSystem.root);
    fileSystem.root.getDirectory("vids", {create: true}, gotDir);
    console.log("gotFS ended...");
}

gotDir = function(dirEntry) {
  console.log("gotDir called...", dirEntry);
    dirEntry.getFile("video.MOV", {create: true, exclusive: false}, gotFile);
    console.log("gotDir ended...");
}

gotFile = function(fileEntry) {
  console.log("gotFile called...", fileEntry);
    var localPath = fileEntry.fullPath;
    var localUrl = fileEntry.toURL();

    var fileTransfer = new FileTransfer();
    var uri = encodeURI(localUrl); //<temp path that u have>
    fileTransfer.download(
        uri,
        localUrl,
        function(entry) {
          console.log("video src: ", entry.toNativeURL());
          //  uralToUse = entry.nativeURL; // use this url to play video
          //  var videoNode = document.querySelector('video');
          //  videoNode.src = entry.toNativeURL();
        },
        function(error) { }
    );
    console.log("gotFile ended...");
}

failrequestFileSystem = function(error){
  console.log("filesystem error: ", error);
}
