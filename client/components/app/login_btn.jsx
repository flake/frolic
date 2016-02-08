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
    // console.log("login... ");
    FlowRouter.go('/signup');
  },

  render: function(){
    var styles = {
      signLabel: {
        color: "#fff",
        textShadow: "2px 2px 2px rgba(0, 0, 0, 0.4)"
      }
    };

    return (
      <div>
        <FlatButton
          label="Signup"
          onClick={this._handleLogin}
          style={{backgroundColor: APP.primary}}
          labelStyle={styles.signLabel}
        />
      </div>
    )
  }
});
