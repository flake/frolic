
Template._froinfo.helpers({
  FroInfo: function(){
    return FroInfo;
  },
  fro: function(){
    console.log("fro Id from _froInfo " + this.froId);
    return Fros.findOne(this.froId);
  }
});
