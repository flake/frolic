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
  insert:function(userId,fro){
    return true; // **TODO** update to userId
  },
  update:function(userId,fro,fields,modifier){
   return userId === fro.owner;
  },
  remove:function(userId,fro){
    return userId === fro.owner;
  },
  download:function(){
    return true; // **TODO**
  }
});
