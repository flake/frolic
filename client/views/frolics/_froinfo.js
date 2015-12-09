
Template._froinfo.helpers({
  create: function(){

  },
  rendered: function(){

  },
  destroyed: function(){

  },
  FroInfo: function(){
    return FroInfo;
  },
  fro: function(){
    console.log("fro Id from _froInfo " + this.froId);
    return Fros.findOne(this.froId);
  }
});

Template._froinfo.events({
  "click #foo": function(event, template){

  }
});
