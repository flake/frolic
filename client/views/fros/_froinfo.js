
Template._froinfo.helpers({
  FroInfo: function(){
    return FroInfo;
  },
  fro: function(){
    // console.log("fro Id from _froInfo " + this.froId);
    return Fros.findOne(this.froId);
  },
  heartClass: function(){
    var fro = Fros.findOne(this.froId);
    return hrt = fro.isHearted() ? "heart" : "heart-o";
  }
});
// 
// Template._froinfo.onCreated(function(){
//   var pdata = Template.parentDate(0);
//   var self = this;
//   self.autorun(function(){
//     self.subscribe("fro", pdata.froId);
//   });
// });
