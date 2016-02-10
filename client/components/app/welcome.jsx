var {
  Card,
  CardText,
  TextField,
  RaisedButton,
  FontIcon,
  FlatButton
} = MUI;

Welcome = React.createClass({

  //IMPORTANT SET CHILD CONTEXT
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function(){
    return {
      muiTheme: newTheme
    };
  },

  _handleFacebook: function(){
    Meteor.loginWithFacebook({ requestPermissions: ['email', 'public_profile', 'user_friends']},
			function(err){
				if(err){
					return console.log(err);
				}
			});
  },

  _handleGoogle: function(){
    Meteor.loginCordovaGoogle({
        cordova_google: true,
        profile: ["email", "email_verified", "gender", "locale", "name", "picture"]
      }, function(error) {
            if (error) {
                //error handling code
                alert(error);
            }else{
              FlowRouter.reload();
              console.log("google signup success " + Meteor.userId());
              // alert("Signed up");
            }
    });
  },

  handleSubmit: function(event){
    var email = this.refs.email.getValue();
    var password = this.refs.password.getValue();
    Meteor.loginWithPassword(email, password, function(error){
      if(error){
        console.log("login error ", error);
      }else{
        console.log("login success " + Meteor.userId());
        FlowRouter.go('/');
        // FlowRouter.reload();
      }
    })
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
        textShadow: "2px 2px 2px rgba(0, 0, 0, 0.4)",
        marginTop: "8px"
      },
      facebookSignup: {
        width: "48.4%",
        backgroundImage: "linear-gradient(#2953ad, #234ca2)",
        color: "#fff",
        borderRadius: "2px",
        textAlign: "left",
        paddingLeft: "8px"
      },
      googleSignup: {
        width: "48%",
        backgroundColor: "#dc4e41", //#dd4b39
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
      },
      signupMsg: {
        fontSize: "11px",
        color: APP.paper,
        display: "inline-block",
        verticalAlign: "middle"
      }
    };

    return (
      <div style={{padding: "16px"}}>
        <CardText style={{backgroundColor: APP.primary}}>
          <form>
            <TextField
              hintText="Email"
              fullWidth={true}
              inputStyle={{"color": "#fff"}}
              hintStyle={{"color": "rgba(255, 255, 255, 0.4)"}}
              underlineStyle={{"borderColor": "rgba(255, 255, 255, 0.4)"}}
              underlineFocusStyle={{"borderColor": "#f9f9f9"}}
              ref="email"/>
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
              label="Login"
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
            onTouchTap={this._handleFacebook} >
            <FontIcon className="fa fa-facebook" style={Styles.connectIcon} />
          </FlatButton>
          <FlatButton
            label="Google"
            labelStyle={styles.labelStyle}
            labelPosition="after"
            secondary={true}
            fullWidth={true}
            style={styles.googleSignup}
            onTouchTap={this._handleGoogle} >
            <FontIcon className="fa fa-google" style={Styles.connectIcon} />
          </FlatButton>
        </CardText>
        <CardText style={{"textAlign": "right"}}>
          <span style={styles.singupMsg}>Create an account? </span><LoginBtn style={{"display": "inline-block"}}/>
        </CardText>
      </div>
    );
  }
});
