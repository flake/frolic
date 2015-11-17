
Template._fro.helpers({
  create: function(){

  },
  rendered: function(){

  },
  destroyed: function(){

  },
  FroItem: function(){
    return FroItem;
  },
  video: function(){
    var vid = Frolics.findOne({_id: this.fsId});
    console.log("vid obj " + vid);
    return vid;
  }
});

Template._fro.events({
  "click #foo": function(event, template){

  }
});
