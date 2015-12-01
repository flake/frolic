
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
  frolic: function(){
    console.log("frolic Id from _froInfo " + this.frolicId);
    return Frolics.findOne(this.frolicId);
  }
});

Template._froinfo.events({
  "click #foo": function(event, template){

  }
});
