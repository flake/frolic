var {
  Card,
  ListItem,
  FontIcon,
  IconButton,
  Avatar
} = MUI;

UserCard = React.createClass({
  propTypes: {
    user: React.PropTypes.object
  },
  getDefaultProps: function(){
    return {
      user: {}
    }
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

    var styles = {
      avatar: {
        top: "8px",
        left: "8px"
      },
      proItem: {
        backgroundColor: "#fff",
        padding: "15px 48px 14px 64px"
      },
      circleIcon: {
        color: "#fff",
        top: "4px",
        left: "-1px"
      },
      circleBtn: {
        background: APP.primary,
        color: "#fff",
        borderRadius: "24px",
        width: "40px",
        height: "40px",
        padding: "0",
        marginRight: "8px",
        top: "14px"
      }
    };

    var avatar = (
      <Avatar
        src={this.props.user.avatar}
        size={48}
        style={styles.avatar}
      />);

    var rightIconBtn = (
      <IconButton
        iconClassName="material-icons"
        iconStyle={styles.circleIcon}
        style={styles.circleBtn}
      >person_add</IconButton>
    );

    return (
      <Card>
        <ListItem
          primaryText={this.props.user.profile.name}
          secondaryText={this.props.user.profile.title}
          leftAvatar={avatar}
          rightIconButton={rightIconBtn}
          disabled={true}
          style={styles.proItem}
        />
      </Card>
    )
  }
});
