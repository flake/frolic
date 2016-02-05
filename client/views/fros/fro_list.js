
Template.froList.helpers({
  FroMini: function(){
    return FroMini;
  },
  fros: function(){
    // console.log("froQuery " + JSON.stringify(this.froQuery));
    var froQuery = {};
    switch(this.context){
      case 'screen_fros':
        froQuery = {screenId: this.screenId}
        break;
      case 'hearted_fros':
        var heartsCurs = Hearts.find({userId: this.userId, valid: true});
        froIds = heartsCurs.map(function(f){ return f.froId;});
        console.log("hearted froIds " + froIds);
        froQuery = {_id: {$in: froIds}};
        break;
      default:
        console.log("No match for Fros");
    }
    return Fros.find(froQuery);
  }
});
