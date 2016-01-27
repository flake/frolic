var {Card, CardText, TextField, RaisedButton, FontIcon, FlatButton} = MUI;

Signup = React.createClass({

  //IMPORTANT SET CHILD CONTEXT
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function(){
    return {
      muiTheme: newTheme
    };
  },

  handleFacebook: function(){
    Meteor.loginWithFacebook({ requestPermissions: ['email', 'public_profile', 'user_friends']},
			function(err){
				if(err){
					return console.log(err);
				}
			});
  },

  handleGoogle: function(){
    Meteor.loginWithGoogle({
        requestPermissions: ['email', 'profile', 'https://www.google.com/m8/feeds'],
        requestOfflineToken: true,
        forceApprovalPrompt: true },
        function(err){
          if(err)
            return console.log(err);
        }
    );
  },

  handleSubmit: function(event){
    var fullname = this.refs.fullname.getValue();
    var email = this.refs.emailphn.getValue();
    var password = this.refs.password.getValue();

    var userId = Accounts.createUser({
      email: email,
      password: password,
      profile: {fullname: fullname}
    }, function(error){
      if(error){
        console.log("Error Signup");
        if(error.error === "email"){
          console.log("Error email " +error.reason);
          Dialogs.alert("Email " + error.reason);
        }
      }else{
        //send verification
        console.log("Signup success");
        FlowRouter.go('/');
        FlowRouter.reload();
      }
    });

    // Meteor.call("newUser", email, password, {fullname: fullname}, function(error, result){
    //   if(error){
    //     console.log("new user error ", error);
    //   }
    //   if(result){
    //      console.log("new user result ", result);
    //      FlowRouter.go('/');
    //      FlowRouter.reload();
    //   }
    // });
  },

  render: function(){

    var styles = {
      emailSignup: {
        width: "100%",
        backgroundColor: "#fff",
        color: APP.primary,
        borderRadius: "2px"
      },
      emailLabel: {
        textTransform: "uppercase",
        paddingLeft: "8%",
        verticalAlign: "middle",
        color: APP.primary,
        textShadow: "2px 2px 2px rgba(0, 0, 0, 0.4)"
      },
      facebookSignup: {
        width: "48%",
        backgroundImage: "linear-gradient(#2953ad, #234ca2)",
        color: "#fff",
        borderRadius: "2px",
        textAlign: "left",
        paddingLeft: "8px"
      },
      googleSignup: {
        width: "48%",
        backgroundColor: "#dd4b39",
        color: "#fff",
        borderRadius: "2px",
        textAlign: "left",
        paddingLeft: "8px",
        marginLeft: "8px"
      },
      twitterSignup: {
        width: "48%",
        backgroundColor: "#55acee",
        color: "#fff",
        borderRadius: "2px",
        textAlign: "left",
        paddingLeft: "8px",
        marginBottom: "8px",
        marginLeft: "10px"
      },
      labelStyle: {
        textTransform: "none",
        paddingLeft: "8%",
        verticalAlign: "middle"
      }
    };

    return (
      <div style={{padding: "16px"}}>
        <CardText style={{backgroundColor: APP.primary}}>
          <form>
            <TextField
              hintText="Full name"
              fullWidth={true}
              inputStyle={{"color": "#fff"}}
              hintStyle={{"color": "rgba(255, 255, 255, 0.4)"}}
              underlineStyle={{"borderColor": "rgba(255, 255, 255, 0.4)"}}
              underlineFocusStyle={{"borderColor": "#f9f9f9"}}
              ref="fullname"/>
            <TextField
              hintText="Email or Phone"
              fullWidth={true}
              inputStyle={{"color": "#fff"}}
              hintStyle={{"color": "rgba(255, 255, 255, 0.4)"}}
              underlineStyle={{"borderColor": "rgba(255, 255, 255, 0.4)"}}
              underlineFocusStyle={{"borderColor": "#f9f9f9"}}
              ref="emailphn"/>
            <TextField
              hintText="Password"
              type="password"
              fullWidth={true}
              inputStyle={{"color": "#fff"}}
              hintStyle={{"color": "rgba(255, 255, 255, 0.4)"}}
              underlineStyle={{"borderColor": "rgba(255, 255, 255, 0.4)"}}
              underlineFocusStyle={{"borderColor": "#f9f9f9"}}
              ref="password"/>
            <RaisedButton
              label="Sign Up"
              labelStyle={styles.emailLabel}
              fullWidth={true}
              style={styles.emailSignup}
              onClick={this.handleSubmit}/>
          </form>
        </CardText>

        <CardText style={{"padding": "8px 16px"}}>
          <FlatButton
            label="Facebook"
            labelStyle={styles.labelStyle}
            labelPosition="after"
            secondary={true}
            fullWidth={true}
            style={styles.facebookSignup}
            onClick={this.handleFacebook} >
            <FontIcon className="fa fa-facebook" style={Styles.connectIcon} />
          </FlatButton>
          <FlatButton
            label="Google"
            labelStyle={styles.labelStyle}
            labelPosition="after"
            secondary={true}
            fullWidth={true}
            style={styles.googleSignup}
            onClick={this.handleGoogle} >
            <FontIcon className="fa fa-google" style={Styles.connectIcon} />
          </FlatButton>
        </CardText>
      </div>
    );
  }
});


// <FlatButton
//   label="Twitter"
//   labelStyle={styles.labelStyle}
//   labelPosition="after"
//   secondary={true}
//   fullWidth={true}
//   style={styles.twitterSignup}
//   onClick={this.handleTwitter} >
//   <FontIcon className="fa fa-twitter" style={Styles.connectIcon} />
// </FlatButton>

// <FlatButton
//   label="Sign up with Email"
//   labelStyle={styles.labelStyle}
//   labelPosition="after"
//   secondary={true}
//   fullWidth={true}
//   style={styles.emailSignup}
//   onClick={this.handleEmail} >
//   <FontIcon className="fa fa-envelope" style={Styles.connectIcon} />
// </FlatButton>
