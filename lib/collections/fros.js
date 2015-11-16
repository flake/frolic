Fros = new Mongo.Collection('fros');

Fros.before.insert(function(userId, doc){
  doc.createdAt = new Date();
});

Fros.helpers({
  datePublished: function(){
    return moment(this.createdAt).format('M/D');
  },
  owner: function(){
    return Meteor.users.findOne({_id: this.userId});
  }
});

Fros.attachSchema(new SimpleSchema({
  fsid: {
    type: String
  },
  title: {
    type: String,
    max: 60
  },
  tagline: {
    type: String,
    max: 140
  },
  userId: {
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
  tags: {
    type: [String],
    optional: true,
    defaultValue: []
  },
  views: {
    type: Number,
    optional: true,
    defaultValue: 0
  }
}));
