Template.home.helpers({
  fros: function(){
    // console.log("Frolics count: " + Frolics.find().count());
    return Fros.find();
  },
  FroScreen: function(){
    return FroScreen;
  },
  froFS: function(){
    // console.log("Frolic Id: " + this.froId);
    var froFS = {
      fro: null,
      thumb: null
    };
    var fro = Fros.findOne(Session.get("froPlay"));

    if(fro){
      var froFs = FroFS.findOne(fro.fsId);
      froFS.fro = froFs.url();
      froFS.thumb = ThumbFS.findOne(fro.thumb_fs).url();
    }

    return froFS;
  },
  // SpaceBar: function(){
  //   return SpaceBar;
  // },
  isPlaying: function(){
    return Session.get("isPlaying");
  },
  moreFros: function(){
    return !(Fros.find().count() < Session.get("froLimit"));
  }
});

Template.home.onRendered(function(){
  Session.set('appTitle', "frolic");
  // console.log("Current user " + Meteor.user());
  // Session.set('targetTop', $('#show-more-fros').offset().top);
  $(window).scroll(showMoreVisible);
});

Template.home.onCreated(function(){
  Session.set("froPlay", "");
  Session.set("isPlaying", false);

  FRO_INCREMENT = 9;
  Session.set("froLimit", FRO_INCREMENT);

  var self = this;
  self.autorun(function(){
    self.subscribe("profile", Meteor.userId());
    self.subscribe("fros_home", Session.get('froLimit'));
  });
});

showMoreVisible = function(){
  var threshlold, target = $('#show-more-fros');
  if(!target.length) return;

  var windowTop = $(window).scrollTop();
  var targetTop = target.offset().top;

  // if(Session.get('targetTop')){
  //   if(targetTop > Session.get('targetTop')){
  //     $(window).scrollTop($(window).scrollTop() + 99);
  //   }
  // };

  // Session.set('targetTop', targetTop);
  threshold = windowTop + $(window).height() - target.height();
  // console.log("loading more...");
  // console.log("threshold " + threshold + " target top " + targetTop);

  if(targetTop <= threshold){
    if(!target.data("visible")){
      target.data("visibile", true);
      Session.set("froLimit", Session.get('froLimit') + FRO_INCREMENT);

      // Meteor.setTimeout(function(){
      //   $(window).scrollTop($(window).scrollTop() + 300);
      // }, 1000);
    }
  }else{
    if(target.data("visible")){
      target.data("visibile", false);
    }
  }
}
