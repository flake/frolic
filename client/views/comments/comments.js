
Template.comments.helpers({
  create: function(){

  },
  rendered: function(){

  },
  destroyed: function(){

  },

  comments: function(){
    return Comments.find({frolicId: this.frolicId});
  }
});

Template.comments.events({
  "click #foo": function(event, template){

  }
});
