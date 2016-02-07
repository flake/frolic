
Template.notify.helpers({
  notifys: function(){
    return Notifications.find({userId: Meteor.userId()}, {sort: {createdAt: -1}});
  }
});

Template._notify.helpers({
    NotifyItem: function(){
      return Notify;
    },
    fromUser: function(){
      // console.log("_notify data fromId " + this.fromId);
      return Meteor.users.findOne(this.fromId);
    },
    notify: function(){
      var notify = {
        _id: this._id,
        when: this.dateWhen(),
        read: this.read
      };
      if(this.verb === "commented"){
        notify.target = "/fro/"+this.sourceId;
        notify.message = "commented on your fro";
      }
      if(this.verb === "hearted"){
        notify.target = "/fro/"+this.sourceId;
        notify.message = "hearted your fro";
      }
      return notify;
    }
});

Template.notify.onCreated(function(){
  var self = this;
  self.autorun(function(){
    self.subscribe('notifications');
  });
});

Template._notify.onCreated(function(){
  var pdata = Template.parentData(0);
  // console.log("_notify onCreate %s: %s" + pdata.fromId, pdata.verb );
  var self = this;
  self.autorun(function(){
    self.subscribe('profile', pdata.fromId);
  });
});


// targetUrl: function(){
//   var url = "/";
//   if(this.verb === "hearted" || this.verb === "commented"){
//     url = "/fro/"+this.sourceId;
//   }
//   return url;
// },
// dateWhen: function(){
//   return this.dateWhen();
// }
