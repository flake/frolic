App.info({
  id: 'in.avatarlabs.frolicplay',
  name: 'frolic',
  description: 'A moment of joy',
  author: 'Rajasekhar',
  website: 'www.frolicplay.com',
  version: '0.1.1'
});

App.icons({
  'android_ldpi' : 'resources/icons/fro_ldpi.png',
  'android_mdpi' : 'resources/icons/fro_mdpi.png',
  'android_hdpi' : 'resources/icons/fro_hdpi.png',
  'android_xhdpi' : 'resources/icons/fro_xhdpi.png'
});

App.accessRule("*://meteor.local/*");
App.accessRule("whatsapp:*");
App.accessRule("blob:*");
App.accessRule("file://*");
// App.accessRule("*://127.0.0.1:8080/*");
App.accessRule("*://fonts.googleapis.com/*");
App.accessRule("*://fonts.gstatic.com/*");
// App.accessRule("*");
