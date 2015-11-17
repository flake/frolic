Template.home.helpers({
  fros: function(){
    console.log("Fros count: " + Fros.find().count());
    return Fros.find({}, {sort: {createdAt: -1}});
  },
  SpaceBar: function(){
    return SpaceBar;
  },
  rendered: function(){

  }
});
