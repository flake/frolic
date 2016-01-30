
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
  // Session.set("addVideoModal", true);
}

uploadThumb = function(thumbData){
  var fsFile = new FS.File(thumbData);
  fsFile.owner = Meteor.userId();
  ThumbFS.insert(fsFile, function (err, fileObj) {
    if (err){
      console.log("ThumbFS failed!");
    }
    else {
      Session.set('newThumb', fileObj._id);
      console.log("file upload success: "+ JSON.toString(fileObj));
    }
  });
}

uploadFro = function(froData){
  var fsFile = new FS.File(froData);
  fsFile.owner = Meteor.userId();
  FroFS.insert(fsFile, function (err, fileObj) {
    if (err){
      console.log("FroFS failed!");
    }
    else {
      Session.set('newFro', fileObj._id);
      FlowRouter.go('/fro/new');
      console.log("file upload success: "+ JSON.toString(fileObj));
    }
  });
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

captalize = function(string){
  string = string.toLowerCase().replace(/\b[a-z]/g, function(letter){
    return letter.toUpperCase();
  });
  return string;
};

readURL = function(input, callback){
    if(input.files && input.files[0]){
        var reader = new FileReader();
        var file = input.files[0];

        reader.onload = function(e){
          var res = e.target.result;
            Session.set('img_src', res);
            callback(res);
        }

        reader.readAsDataURL(file);
    }
}

// else{
//   console.log("camrec clicked");
//   invokePlayer("/skirtups.mp4");
// }
