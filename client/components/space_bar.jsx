var { Card } = MUI;

SpaceBar = React.createClass({
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
        <h5>Hello {this.props.user.profile.name}!</h5>
      </Card>
    )
  }
});
