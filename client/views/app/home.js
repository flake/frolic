Template.home.helpers({
  frolics: function(){
    // console.log("Frolics count: " + Frolics.find().count());
    return Frolics.find({}, {sort: {createdAt: -1}});
  },
  SpaceBar: function(){
    return SpaceBar;
  },
  rendered: function(){

  }
});
