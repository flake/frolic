
Template.comments.helpers({
  comments: function(){
    console.log("HELPER comments froId "+ this.froId);
    return Comments.find({froId: this.froId});
  },
  empty: function(){
    return Comments.findOne({froId: this.froId}) ? "false" : true;
  }
});

Template.comments.events({

});

Template.comments.onCreated(function(){
  var pdata = Template.parentData(0);
  var self = this;

  self.autorun(function(){
    self.subscribe("comments", pdata.froId);
  });
});
