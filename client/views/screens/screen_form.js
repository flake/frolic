
Template.screenForm.helpers({
  create: function(){

  },
  rendered: function(){

  },
  destroyed: function(){

  },

  ScreenForm: function(){
    return ScreenForm;
  },
  screen: function(){
    if(this.screenId){
      return Screens.findOne(this.screenId);
    }

    return null;
  }
});

Template.screenForm.events({
  "change #screen-upload": function(event, template){
    console.log("screen-upload changed " + event.target.value);
  }
});
