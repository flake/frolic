Template.feedback.helpers({
  Feedback: function(){
    return Feedback;
  }
});

Template.feedback.events({
  // 'click #fro-feedsend': function(event, template){
  //   var msg = template.find('#fro-feedmsg');
  //   var data = {
  //     message: msg
  //   };
  //   Meteor.call("feedback", data, function(error){
  //     console.log("feedback callback ");
  //     if(error){
  //       console.log("feedback error " + error);
  //     }else{
  //       Dialogs.alert("_/\_ Thank You :)");
  //     }
  //   });
  // }
});

Template.feedback.onCreated(function(){
  Session.set("appTitle", "feedback");
});
