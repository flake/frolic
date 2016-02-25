var {
  Card,
  RaisedButton,
  FontIcon,
  ListItem
} = MUI;

ScreensPanel = React.createClass({
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
    return {
      follow: false
    }
  },

  _handleNewBtn: function(){
    FlowRouter.go('/screen/new');
  },

  render: function(){
    var styles = {
      screensCard: {
        padding: "8px"
      },
      newBtn: {
        float: "right"
      },
      newIcon:{
        color: APP.primary,
        fontSize: "24px",
        left: "8px",
        verticalAlign: "middle"
      },
      newLabel: {
        top: "1px"
      }
    };

    return (
      <Card
        style={styles.screensCard}>
        <ListItem
          primaryText='Create new Screen'
          leftIcon={
            <FontIcon
              style={styles.newIcon}
              className="fa fa-film"/>
          }
          onTouchTap={this._handleNewBtn}
        />
      </Card>
    );
  }
});

// <RaisedButton
//   secondary={true}
//   label="New Screen"
//   labelPosition="after"
//   labelStyle={styles.newLabel}
//   onTouchTap={this._handleNewBtn}
//   style={styles.newBtn} >
//
// </RaisedButton>
