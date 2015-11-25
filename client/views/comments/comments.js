
Template.comments.helpers({
  create: function(){

  },
  rendered: function(){

  },
  destroyed: function(){

  },

  comments: function(){
    console.log("HELPER comments frolicId "+this.frolicId);
    return Comments.find({frolicId: this.frolicId});
  },
  NewComment: function(){
    return NewComment;
  }
});

Template.comments.events({
  "click #add-comment": function(event, template){
    var comment = {
      "content": template.find('#comment-text').value,
      "frolicId": template.data.frolicId
    };
    prettyJSON(comment);

    Meteor.call("newComment", comment, function(err){
      if(err){
        console.log("insert comment failed. " + err);
      }else{
        template.find('#comment-text').value = '';
      }
    });
  }
});

Template.comments.rendered = function(){
  console.log("Comments rendered...");
}
