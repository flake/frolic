var {Card, CardText, TextField, RaisedButton, FontIcon, FlatButton} = mui;

Signin = React.createClass({

  //IMPORTANT SET CHILD CONTEXT
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function(){
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  facebookLogin: function(){
    Meteor.loginWithFacebook({ requestPermissions: ['email', 'public_profile', 'user_friends']},
			function(err){
				if(err){
					return console.log(err);
				}
			});
  },

  passwordLogin: function(){
    var email = this.refs.email.getValue();
    var password = this.refs.password.getValue();
    Meteor.loginWithPassword(email, password, function(error){
      if(error){
        console.log("login error ", error);
      }else{
        FlowRouter.go('/');
        FlowRouter.reload();
      }
    })
  },

  render: function(){
    return (
      <Card>
        <CardText>
          <RaisedButton secondary={true} labelPosition="after" label="Signin with facebook" fullWidth={true} backgroundColor="#2953ad" onClick={this.facebookLogin}>
            <FontIcon className="fa fa-facebook-square" color={"#ffffff"}/>
          </RaisedButton>
        </CardText>
        <CardText>
          <TextField hintText="Email" fullWidth={true} ref="email"/>
          <TextField hintText="Password" type="password" fullWidth={true} ref="password"/>
          <RaisedButton label="Login" secondary={true} fullWidth={true} onClick={this.passwordLogin} />
        </CardText>
        <CardText>
          No account yet, <FlatButton linkButton={true} href="/signup" label="Signup" secondary={true} />
        </CardText>
      </Card>
    );
  }
})
