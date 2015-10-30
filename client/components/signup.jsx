var {Card, CardText, TextField, RaisedButton, FontIcon, FlatButton} = MUI;

Signup = React.createClass({

  //IMPORTANT SET CHILD CONTEXT
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function(){
    return {
      muiTheme: ThemeManager.getCurrentTheme()
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
          FlowRouter.go('/');
        }
      });
  },

  render: function(){
    return (
      <Card>
        <CardText>
          <form>
            <TextField hintText="Firstname Lastname" fullWidth={true} ref="fullname"/>
            <TextField hintText="Email" fullWidth={true} ref="emailphn"/>
            <TextField hintText="Password" type="password" fullWidth={true} ref="password"/>
            <RaisedButton label="Sign Up" secondary={true} fullWidth={true} onClick={this.handleSubmit}/>
          </form>
        </CardText>
      </Card>
    );
  }
})
