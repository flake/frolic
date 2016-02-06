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
      user: {
        avatar: "/img/fravatar.jpg",
        profile: { name : "Developers", title: "Ninjas of Avatar Labs"}
      }
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
        padding: "15px 48px 36px 64px"
      },
      circleIcon: {
        color: APP.primary,
        background: "#fff",
        border: "2px solid " + APP.primary,
        borderRadius: "24px",
        top: "2px",
        left: "-6px",
        padding: "4px"
      }
      // circleBtn: {
      //   color: "#fff",
      //   padding: "0",
      //   marginRight: "8px",
      //   top: "14px"
      // }
    };

    // background: APP.primary,
    // borderRadius: "24px",
    // width: "40px",
    // height: "40px",

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
