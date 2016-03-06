App.info({
  id: 'in.avatarlabs.frolicplay',
  name: 'frolic',
  description: 'A moment of joy',
  author: 'Rajasekhar',
  website: 'www.frolicplay.com',
  version: '0.7.2'
});

App.icons({
  'android_ldpi' : 'resources/icons/fro_ldpi.png',
  'android_mdpi' : 'resources/icons/fro_mdpi.png',
  'android_hdpi' : 'resources/icons/fro_hdpi.png',
  'android_xhdpi' : 'resources/icons/fro_xhdpi.png'
});

App.launchScreens({
  'android_ldpi_portrait': 'resources/splash/frolic_port_ldpi.png',
  'android_ldpi_landscape': 'resources/splash/frolic_land_ldpi.png',
  'android_mdpi_portrait': 'resources/splash/frolic_port_mdpi.png',
  'android_mdpi_landscape': 'resources/splash/frolic_land_mdpi.png',
  'android_hdpi_portrait': 'resources/splash/frolic_port_hdpi.png',
  'android_hdpi_landscape': 'resources/splash/frolic_land_hdpi.png',
  'android_xhdpi_portrait': 'resources/splash/frolic_port_xhdpi.png',
  'android_xhdpi_landscape': 'resources/splash/frolic_land_xhdpi.png'
});

App.accessRule("*://meteor.local/*");
App.accessRule("whatsapp:*");
App.accessRule("blob:*");
App.accessRule("file://*");
// App.accessRule("*://127.0.0.1:8080/*");
App.accessRule("*://www.googleapis.com/*");
App.accessRule("*://fonts.googleapis.com/*");
App.accessRule("*://fonts.gstatic.com/*");
//App.accessRule("*://192.168.0.101:3000/*");
App.accessRule("*://13.94.40.20/*");
App.accessRule("*://www.frolicplay.com/*");
// App.accessRule("http:///*");
App.accessRule("*");

App.setPreference('android-minSdkVersion', '15');
App.setPreference('android-targetSdkVersion', '23');
