
Template.froNew.helpers({
  FroNew: function(){
    return FroNew;
  },
  frosrc: function(){
    return Session.get('newFro');
  }
  // snaps: function(){
  //   return Session.get('vidsnaps') ? Session.get('vidsnaps'):[];
  // }
});

Template.froNew.events({

});

Template.froNew.onCreated(function(){
  Session.set('vidsrc', '');
  Session.set('vidsnaps', []);
});
