var {
  Avatar,
  List,
  ListItem,
  FontIcon
} = MUI;

MyCircles = React.createClass({
  propTypes: {
    circles: React.PropTypes.array
  },
  getDefaultProps: function(){
    return [];
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

  componentDidMount: function(){
    FroActions.renderSwipes();
  },

  _circleMembers: function(circleId){
    console.log("circleId for members " + circleId);
    FlowRouter.go('/circle/' + circleId);
  },

  render: function(){
    var styles = {
      circleIcon: {
        color: APP.primary,
        fontSize: "24px",
        left: "8px",
        verticalAlign: "middle"
      }
    };

  return (
      <List title="My Circles">
        {
          this.props.circles.map(function(circle, i){
            var letters = (circle.title).substring(0,2);
            var secondary = (circle.count > 1) ? " members": " member";

            return (
              <ListItem
                primaryText={circle.title}
                secondaryText={circle.count + secondary}
                leftIcon={
                  <FontIcon
                    style={styles.circleIcon}
                    className="fa fa-circle-o"/>
                }
                onTouchTap={this._circleMembers.bind(this, circle._id)}
                key={i} />
            )
          }, this)
        }
      </List>
    )
  }
});

// var leftIcon = (
//   <Avatar
//     color={APP.primary}
//     size={48}
//   >{letters}</Avatar>
// );
