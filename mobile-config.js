App.info({
  name: 'frolic',
  description: 'A moment of joy',
  author: 'Rajasekhar',
  website: '',
  version: '0.1.2'
});

App.accessRule("http://meteor.local/*");
App.accessRule("blob:*");
App.accessRule("file:*");
App.accessRule("http://127.0.0.1:8080/*");
App.accessRule("https://fonts.googleapis.com/*");
App.accessRule("*");
