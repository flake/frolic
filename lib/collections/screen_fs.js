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
  insert: function(userId, screen){
    return true; // **TODO** update to userId
  },
  update: function(userId, screen, fields, modifier){
    return userId === screen.owner_id;
  },
  remove: function(userId, screen){
    return userId === screen.owner_id;
  },
  download: function(){
    return true; // **TODO **
  }
})
