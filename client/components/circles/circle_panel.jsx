var {
  Card,
  RaisedButton,
  FontIcon,
  ListItem
} = MUI;

CirclePanel = React.createClass({
  //IMPORTANT SET CHILD CONTEXT
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function(){
    return {
      muiTheme: newTheme
    };
  },
  getInitialState: function(){
    return {
      follow: false
    }
  },

  _handleNewBtn: function(){
    Session.set('openCircleNew', true);
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
          primaryText='Create new Circle'
          leftIcon={
            <FontIcon
              style={styles.newIcon}
              className="fa fa-plus"/>
          }
          onTouchTap={this._handleNewBtn}
        />
      </Card>
    );
  }
});
