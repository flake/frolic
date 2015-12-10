
Template.usersList.helpers({
  users: function(){
    return Meteor.users.find(this.userQuery);
  }
});

Template.usersList.events({
  "click #foo": function(event, template){

  }
});
