// var navIcons = [
//   {"id": "frolic-search", "class": "material-icons", "maticon": "search"},
//   {"id": "frolic-notify", "class": "material-icons", "maticon": "notifications"},
//   {"id": "frolic-videocam", "class": "material-icons", "maticon": "videocam"},
// ];

welcome = FlowRouter.group({
  triggersEnter: [function(){
    if(Meteor.loggingIn() || Meteor.userId()){
      var route = FlowRouter.current();

      if(route.route.name == 'login')
        FlowRouter.go('home');
    }
  }]
});

passed = FlowRouter.group({
  triggersEnter: [function(){
    if( !Meteor.loggingIn() && !Meteor.userId() ){
      var route = FlowRouter.current();

      if(route.route.name !== 'login')
        Session.set('redirectAfterLogin', route.path);

      FlowRouter.go('login');
    }
  }]
});

// FlowRouter.route('/', {
//   name: 'home',
//   action: function(){
//     if(!Meteor.user() && !Meteor.loggingIn()){
//       BlazeLayout.render('welcomeLayout', {content: 'signup'});
//     }else{
//       // var params = { navicons : navIcons };
//       BlazeLayout.render('appLayout', {content: 'home'});
//     }
//   }
// });

passed.route('/', {
  name: 'home',
  action: function(){
    BlazeLayout.render('appLayout', {content: 'home'});
  }
});

welcome.route('/login', {
  name: 'login',
  action: function(){
    BlazeLayout.render('welcomeLayout', {content: 'welcome'});
  }
});

welcome.route('/signup', {
  name: 'signup',
  action: function(){
    BlazeLayout.render('welcomeLayout', {content: 'signup'});
  }
});

welcome.route('/fro/:froId', {
  name: 'fro',
  action: function(params){
    var navIcons = [
      {"id": "frolic-view", "class": "nav-tabs tab-active material-icons", "maticon": "movie"},
      {"id": "frolic-comments", "class": "nav-tabs material-icons", "maticon": "sms"},
      {"id": "frolic-related", "class": "nav-tabs material-icons", "maticon": "party_mode"},
    ];
    // Session.set("navIcons", navIcons);
    // params.navicons = navIcons;
    BlazeLayout.render('appLayout', {content: 'fro', params: params});
  }
});

passed.route('/notify', {
  name: 'notify',
  action: function(){
    BlazeLayout.render('appLayout', {content: 'notify'});
  }
});

passed.route('/fro/new', {
  name: 'fornew',
  action: function(){
    BlazeLayout.render('appLayout', {content: 'froNew'});
  }
});

passed.route('/screen/new', {
  name: 'newScreen',
  action: function(){
    Session.set('appTitle', "Create");
    BlazeLayout.render('appLayout', {content: 'screenForm'});
  }
});

passed.route('/screen/:screenId', {
  name: 'screen',
  action: function(params){
    BlazeLayout.render('appLayout', {content: 'screen', params});
  }
});

passed.route('/screens', {
  name: 'screens',
  action: function(){
    BlazeLayout.render('appLayout', {content: 'screens'});
  }
});

passed.route('/profile/:userId', {
  name: 'profile',
  action: function(params){
    BlazeLayout.render('appLayout', {content: 'profile', params: params});
  }
});

passed.route('/circles', {});
passed.route('/messages', {});
passed.route('/settings', {});
passed.route('/feedback', {
  name: 'feedback',
  action: function(){
    BlazeLayout.render('appLayout', {content: "feedback"});
  }
});
passed.route('/help', {});

passed.route('/logout', {
  name: 'logout',
  action: function(){
    Meteor.logout(function(){
      FlowRouter.go(FlowRouter.path('home'));
    });
  }
});

notifyGoogleAnalytics = function(context){
  ga('send', 'pageView', context.path);
}

// we only need to keep history for two paths at once
// first path is what we need to check always
var previousPaths = [null, null];

saveScrollPosition = function(context) {
  var pathInfo = {
    path: context.path,
    scrollPosition: $('body').scrollTop()
  };

  // add a new path and remove the first path
  // using as a queue
  this.previousPaths.push(pathInfo);
  this.previousPaths.shift();
}

jumpToPrevScrollPosition = function(context) {
  var path = context.path;
  var scrollPosition = 0;
  var prevPathInfo = previousPaths[0];
  if(prevPathInfo && prevPathInfo.path === context.path) {
    scrollPosition = prevPathInfo.scrollPosition;
  }

  if(scrollPosition === 0) {
    // we can scroll right away since we don't need to wait for rendering
    $('body').animate({scrollTop: scrollPosition}, 0);
  } else {
    // Now we need to wait a bit for blaze/react does rendering.
    // We assume, there's subs-manager and we've previous page's data.
    // Here 10 millis deley is a arbitary value with some testing.
    setTimeout(function () {
      $('body').animate({scrollTop: scrollPosition}, 0);
    }, 10);
  }
}

// FlowRouter.triggers.exit([saveScrollPosition]);
// FlowRouter.triggers.enter([jumpToPrevScrollPosition]);
