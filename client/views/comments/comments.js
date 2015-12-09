
Template.comments.helpers({
  create: function(){

  },
  rendered: function(){

  },
  destroyed: function(){

  },

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

Template.comments.rendered = function(){
  console.log("Comments rendered... " + this.froId);
}
