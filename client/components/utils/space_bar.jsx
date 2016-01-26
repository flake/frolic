var { Card } = MUI;

SpaceBar = React.createClass({
  propTypes: {
    user: React.PropTypes.object
  },
  //IMPORTANT SET CHILD CONTEXT
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function(){
    return {
      muiTheme: newTheme //Manager.getMuiTheme(MUI.Styles.LightRawTheme)
    };
  },
  getInitialState: function(){
    return { }
  },

  render: function(){

    return (
      <Card>
        <h5>Hello {this.props.user.profile.fullname}!</h5>
      </Card>
    )
  }
});
