var frolicStore = new FS.Store.GridFS("frolics", {
  maxTries: 3,
  chunkSize: 1024*1024
});

Frolics = new FS.Collection("frolics", {
  stores: [frolicStore],
  filter: {
		maxSize: 16*1024*1024,
		allow: {
			contentTypes: ['video/mp4']
		}
	}
});

Frolics.allow({
  insert:function(userId,project){
    return true; // **TEMP** update to userId
  },
  update:function(userId,project,fields,modifier){
   return userId === project.owner;
  },
  remove:function(userId,project){
    return userId === project.owner;
  },
  download:function(){
    return true;
  }
});
