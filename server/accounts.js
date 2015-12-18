Meteor.methods({
  newUser: function(email, password, profile){
     check(email, String);
     check(password, String);
     check(profile, Match.Optional(Object));

     var userId = Accounts.createUser({
       email: email,
       password: password,
       profile: profile
     });

     return userId;
  }
});
