Notifications = new Mongo.Collection('notifications');

Notifications.before.insert(function(userId, doc){
  doc.createdAt = new Date();
});

Notifications.helpers({
  dateWhen: function(){
    return moment(this.createdAt).format('hh:mm, DD MM YYYY');
  }
});

Notifications.attachSchema(new SimpleSchema({
  userId: {
    type: String
  },
  fromId: {
    type: String,
    autoValue: function(){
      if(this.isSet){
        return;
      }
      if(this.isInsert){
        return Meteor.userId();
      }else{
        this.unset();
      }
    }
  },
  sourceId: {
    type: String
  },
  verb: {
    type: String,
    allowedValues: ['commented', 'hearted', 'followed']
  },
  read: {
    type: Boolean,
    optional: true,
    defaultValue: false
  }
}));
