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

  handleSubmit: function(event){
    var fullname = this.refs.fullname.getValue();
    var email = this.refs.emailphn.getValue();
    var password = this.refs.password.getValue();

    Accounts.createUser({
				email: email,
				password: password,
				profile: {
					name: fullname,
					dob: '',
					gender: '',
					location: '',
				}
			}, function(error){
        if(error){
          console.log("signup error");
        }else{
          FlowRouter.reload();
        }
      });
  },

  render: function(){

    var styles = {
      emailSignup: {
        width: "100%",
        backgroundColor: APP.primary,
        color: "#fff",
        borderRadius: "2px",
        textAlign: "left",
        paddingLeft: "8px",
        marginBottom: "8px"
      },
      facebookSignup: {
        width: "48%",
        backgroundImage: "linear-gradient(#2953ad, #234ca2)",
        color: "#fff",
        borderRadius: "2px",
        textAlign: "left",
        paddingLeft: "8px",
        marginBottom: "8px"
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
      googleSignup: {
        width: "48%",
        backgroundColor: "#dd4b39",
        color: "#fff",
        borderRadius: "2px",
        textAlign: "left",
        paddingLeft: "8px",
        marginBottom: "8px"
      },
      labelStyle: {
        textTransform: "none",
        paddingLeft: "8%",
        verticalAlign: "middle"
      }
    };

    return (
      <div style={{padding: "16px"}}>
        <CardText style={{backgroundColor: "#fff"}}>
          <form>
            <TextField hintText="Full name" fullWidth={true} ref="fullname"/>
            <TextField hintText="Email or Phone" fullWidth={true} ref="emailphn"/>
            <TextField hintText="Password" type="password" fullWidth={true} ref="password"/>
            <RaisedButton label="Sign Up" secondary={true} fullWidth={true} onClick={this.handleSubmit}/>
          </form>
        </CardText>

        <CardText style={{backgroundColor: "#fff"}}>
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
            label="Twitter"
            labelStyle={styles.labelStyle}
            labelPosition="after"
            secondary={true}
            fullWidth={true}
            style={styles.twitterSignup}
            onClick={this.handleTwitter} >
            <FontIcon className="fa fa-twitter" style={Styles.connectIcon} />
          </FlatButton>
          <FlatButton
            label="Google"
            labelStyle={styles.labelStyle}
            labelPosition="after"
            secondary={true}
            fullWidth={true}
            style={styles.googleSignup}
            onClick={this.handleTwitter} >
            <FontIcon className="fa fa-google" style={Styles.connectIcon} />
          </FlatButton>
        </CardText>
      </div>
    );
  }
});


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
