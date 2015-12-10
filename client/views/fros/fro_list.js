
Template.froList.helpers({
  create: function(){

  },
  rendered: function(){

  },
  destroyed: function(){

  },
  FroMini: function(){
    return FroMini;
  },
  fros: function(){
    // console.log("froQuery " + JSON.stringify(this.froQuery));
    return Fros.find(this.froQuery);
  }
});

Template.froList.events({
  "click #foo": function(event, template){

  }
});
