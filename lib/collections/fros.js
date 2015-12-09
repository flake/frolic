Fros = new Mongo.Collection('fros');

Fros.before.insert(function(userId, doc){
  doc.createdAt = new Date();
});

Fros.helpers({
  datePublished: function(){
    return moment(this.createdAt).format('hh:mm, DD MMM YYYY');
  },
  owner: function(){
    return Meteor.users.findOne({_id: this.userId});
  },
  isHearted: function(){
    // console.log("isHearted: userId " + Meteor.userId());
    var heart = Hearts.findOne({froId: this._id, userId: Meteor.userId(), valid: true});
    // console.log("isHearted: " + heart);
    return heart ? true : false;
  }
});

Fros.attachSchema(new SimpleSchema({
  fsId: {
    type: String
  },
  title: {
    type: String,
    max: 64
  },
  fro_thumb: {
    type: String // **TODO** FS store
  },
  screen: {
    type: String,
    max: 64
  },
  screenId: {
    type: String
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
  },
  hearts: {
    type: Number,
    optional: true,
    defaultValue: 0
  },
  publish: {
    type: Boolean,
    optional: true,
    defaultValue: true
  }
}));

Meteor.methods({
  addFro:function(fro){
    var froId = Fros.insert(fro);

    return froId;
  }
});
