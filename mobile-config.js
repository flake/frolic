App.info({
  name: 'frolic',
  description: 'A moment of joy',
  author: 'Rajasekhar',
  website: '',
  version: '0.1.1'
});

App.icons({
  'android_ldpi' : 'resources/icons/fro_ldpi.png',
  'android_mdpi' : 'resources/icons/fro_mdpi.png',
  'android_hdpi' : 'resources/icons/fro_hdpi.png',
  'android_xhdpi' : 'resources/icons/fro_xhdpi.png'
});

App.accessRule("*://meteor.local/*");
App.accessRule("blob:*");
App.accessRule("file://*");
App.accessRule("*://127.0.0.1:8080/*");
App.accessRule("https://fonts.googleapis.com/*");
App.accessRule("*");
