var FlatButton = MUI.FlatButton;

LoginBtn = React.createClass({

  //IMPORTANT SET CHILD CONTEXT
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function(){
    return {
      muiTheme: newTheme
    };
  },

  _handleLogin : function(){
    console.log("login... ");
    FlowRouter.go('/login');
  },

  render: function(){

    return (
      <div>
        <FlatButton
          label="Login"
          onClick={this._handleLogin}
          style={{backgroundColor: APP.primary}}
          labelStyle={{color: "#fff"}}
        />
      </div>
    )
  }
});
