
Template.froNew.helpers({
  FroEditor: function(){
    return FroEditor;
  },
  frosrc: function(){
    return Session.get('vidsrc');
  },
  snaps: function(){
    return Session.get('vidsnaps') ? Session.get('vidsnaps'):[];
  }
});

Template.froNew.events({

});

Template.froNew.onCreated(function(){
  Session.set('vidsrc', '');
  Session.set('vidsnaps', []);
});
