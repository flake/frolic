
Template.comments.helpers({
  comments: function(){
    console.log("HELPER comments froId "+ this.froId);
    return Comments.find({froId: this.froId});
  },
  NewComment: function(){
    return NewComment;
  }
});

Template.comments.events({
  "click #add-comment": function(event, template){
    var comment = {
      "content": template.find('#comment-text').value,
      "froId": template.data.froId
    };
    prettyJSON(comment);

    Meteor.call("newComment", comment, function(err){
      if(err){
        console.log("insert comment failed. " + err);
      }else{
        template.find('#comment-text').value = '';
        template.find('#comment-text').placeholder = 'Write a Comment...';
      }
    });
  }
});

Template.comments.onCreated(function(){
  var pdata = Template.parentData(0);
  var self = this;

  self.autorun(function(){
    self.subscribe("comments", pdata.froId);
  });
});
