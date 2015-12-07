var frolicStore = new FS.Store.GridFS("frolics", {
  maxTries: 3,
  chunkSize: 1024*1024
});

FrolicsFS = new FS.Collection("frolics", {
  stores: [frolicStore],
  filter: {
		maxSize: 16*1024*1024,
		allow: {
			contentTypes: ['video/mp4']
		}
	}
});

FrolicsFS.allow({
  insert:function(userId,frolic){
    return true; // **TODO** update to userId
  },
  update:function(userId,frolic,fields,modifier){
   return userId === frolic.owner;
  },
  remove:function(userId,frolic){
    return userId === frolic.owner;
  },
  download:function(){
    return true; // **TODO**
  }
});
