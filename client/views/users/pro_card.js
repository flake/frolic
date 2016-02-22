
Template.proCard.helpers({
  ProCard: function(){
    return ProCard;
  },
  isCircle: function(){
    var circleMember = CircleMembers.findOne({memberId: this._id, userId: Meteor.userId()});
    console.log("circle member on procard " + circleMember);
    if(circleMember)
      return true;

    return false;
  }
});

Template.proCard.onCreated(function(){
  var pdata = Template.parentData(0);
  var self = this;

  self.autorun(function(){
    self.subscribe('circle_member', pdata._id);
  });
});
