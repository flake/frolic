
Template.appLayout.helpers({
  AppHead: function(){
    return AppHead;
  },
  title: function(){
    return Session.get('appTitle');
  },
  sideNav: function(){
    return Session.get('sideNav');
  },
  // AddFloatBtn: function(){
  //   return AddFloatBtn;
  // },
  AddVideoModal: function(){
    return AddVideoModal;
  },
  showVideoModal: function(){
    return Session.get('addVideoModal');
  },
  vidsrc: function(){
    return Session.get('vidsrc');
  },
  vidsnaps: function(){
    return Session.get('vidsnaps') ? Session.get('vidsnaps'):[];
  },
  FroPop: function(){
    return FroPop;
  },
  OptsModal: function(){
    return OptsModal;
  },
  optsOpen: function(){
    Session.setDefault('optsOpen', false);
    return Session.get('optsOpen');
  }
});

Template.appLayout.events({
  "click #frolic-videocam": function(event, template){
    Session.set('optsOpen', true);
    // console.log("frolic event : " + $(event.currentTarget).attr('id'));
  },
  'click .frolic-upload': function(event, template){
    var froPublish = ($(event.currentTarget).attr('id') === "frolic-publish") ? true : false;
    console.log("forlic clicked for upload: " + froPublish);

    var fsFile = new FS.File(Session.get('vidsrc'));
    fsFile.owner = Meteor.userId();
    FrolicsFS.insert(fsFile, function (err, fileObj) {
      if (err) throw err;
      else {
        Session.set('addVideoModal', false);
        console.log("file upload success: "+ JSON.toString(fileObj));
        var fro = {
          fsId: fileObj._id,
          title: template.find('#fro-title').value,
          tagline: template.find('#fro-tagline').value
        }

        console.log("fro obj: " + JSON.toString(fro));

        Meteor.call('addFro', fro, function(error, froId){
          if(error){
            throwError(error.reason);
            console.log("ERROR: "+error.message);
          }else{
            // clean up
            console.log("fro add success... " + froId);
          }
        })
      }
    });
  },

  'click #navigation-back': function(event, template){
    history.back();
  },

  'click #navicon-right': function(event, template){
    Session.set("sideNav", !Session.get("sideNav"));
  },

  'click .nav-tabs': function(event, template){
    var navTabs = $('.nav-tabs');
    var sindex = parseInt(navTabs.index(event.target));
    Session.set('slideIndex', sindex);
    // Session.set('tabIndex', sindex);
    navTabs.removeClass("tab-active");
    navTabs.eq(sindex).addClass("tab-active");
    // console.log("slideIndex from nav-tabs "+ sindex);
  }
});

Template.appLayout.onRendered(function(){
  Session.setDefault('addVideoModal', false);
  Session.setDefault('vidsrc', '');
  Session.setDefault('vidsnaps', []);
});

Template.appLayout.onCreated(function(){
  Session.set('appTitle', 'frolic');
  Session.set('optsOpen', false);
  var self = this;
  self.autorun(function(){
    self.subscribe("fros_fs");
    self.subscribe("hearts", Meteor.userId());
    self.subscribe("profiles");
  });
});
