
Template.screenItem.helpers({
  ScreenItem: function(){
    return ScreenItem;
  }
});

Template.screenItem.onCreated(function(){
  var pdata = Template.parentData(0);
  var self = this;
  self.autorun(function(){
    self.subscribe('screen', pdata._id);
  });
});
