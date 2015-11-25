
Template.frolic.helpers({
  create: function(){

  },
  rendered: function(){
  },
  destroyed: function(){

  },

  FroScreen: function(){
    return FroScreen;
  },
  frolic: function(){
    var frolic = Frolics.findOne(this.frolicId);
    console.log("frolic object");
    prettyJSON(frolic);
    return frolic;
  },
  frolicFS: function(){
    console.log("Frolic Id: " + this.frolicId);
    var frolic = Frolics.findOne(this.frolicId);
    if(frolic)
    return FrolicsFS.findOne({_id: frolic.fsId});
    else {
      return null;
    }
  },
  FroTabs: function(){
    return FroTabs;
  },
  tabIndex: function(){
    return parseInt(Session.get('tabIndex'));
  },
  slideIndex: function(){
    return parseInt(Session.get('slideIndex'));
  }
});

Template.frolic.events({
  "click #foo": function(event, template){

  }
});

Template.frolic.rendered = function(){
  Session.set('tabIndex', 0);
  Session.set('slideIndex', 0);
}
