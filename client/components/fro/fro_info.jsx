var {
  IconButton,
  List,
  ListItem,
  Divider,
  Avatar,
  FontIcon
} = MUI;

FroInfo = React.createClass({
  PropTypes: {
    froId: React.PropTypes.object,
    hearted: React.PropTypes.string
  },

  getDefaultProps: function(){
    return {
      comment: {}
    };
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
    return { };
  },

  render: function(){
    var styles = {
      fontIcon: {
        fontSize: "32px",
        color: APP.primary,
        minWidth: "40px",
        verticalAlign: "middle"
      },
      froTitle: {
        fontSize: "16px",
        color: "#333",
        fontWeight: "600"
      }
    };

    // var screenIcon = (<FontIcon className="fa fa-film"/>);
    var froAvatar = (
      <Avatar
        src={this.props.fro.screenDoc().avatar()}
        size={48} />);
    var followScreen = (<IconButton iconClassName="material-icons" iconStyle={Styles.listIconRight}>screen_share</IconButton>);

    return (
      <div>
      <List subheader={this.props.fro.title} subheaderStyle={styles.froTitle}>
        <ListItem disabled={true} style={{"padding" : "8px"}}>
          <div className="frolic-stats">
            <FontIcon className="fa fa-play" style={styles.fontIcon}></FontIcon><span style={{"fontSize": "16px", "marginLeft": "4px"}}>{this.props.fro.views}</span>
          </div>
          <div className="frolic-stats">
            <FontIcon className={"fa fa-" + this.props.hearted } style={styles.fontIcon}></FontIcon><span style={{"fontSize": "16px"}}>{this.props.fro.hearts}</span>
          </div>
        </ListItem>
        <ListItem disabled={true} leftAvatar={froAvatar} rightIconButton={followScreen}>
          {this.props.fro.screenDoc().title}
        </ListItem>
        <ListItem disabled={true}>
          {this.props.fro.description}
        </ListItem>
      </List>
      <div style={{"paddingTop": "4px"}}>
        <UserCard user={this.props.fro.owner()} />
      </div>
      </div>
    )
  }
})
