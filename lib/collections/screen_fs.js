var screenStore = new FS.Store.GridFS("screens", {
  maxTries: 3,
  chunkSize: 1024*1024
});

ScreensFS = new FS.Collection("screens", {
  stores: [screenStore],
  filter: {
    maxSize: 1024*1024,
    allow: {
      contentTypes: ['image/*']
    }
  }
});

ScreensFS.allow({
  insert: function(userId, fsObj){
    return userId;
  },
  update: function(userId, fsObj, fields, modifier){
    // console.log("fsObj._id "+fsObj._id);
    // var screen = Screens.findOne({cover_photo: fsObj._id});
    //
    // if(screen)
    //   return userId === screen.creator_id;

    return userId;
  },
  remove: function(userId, fsObj){
    return userId;
  },
  download: function(){
    return true; // **TODO **
  }
});
