var {
  IconButton,
  List,
  ListItem,
  Avatar,
  FontIcon
} = MUI;

FroInfo = React.createClass({
  PropTypes: {
    frolicId: React.PropTypes.object
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
        color: "#666",
        marginRight: "6px",
        minWidth: "48px"
      },
      frolicTitle: {
        fontSize: "16px",
        color: "#333",
        fontWeight: "600"
      }
    };

    var screenIcon = (<FontIcon className="fa fa-desktop"/>);
    var froAvatar = (<Avatar backgroundColor={APP.themeGrey} icon={screenIcon} style={{borderRadius: "3px"}} />);
    var followScreen = (<IconButton iconClassName="material-icons" iconStyle={Styles.listIconRight}>screen_share</IconButton>);

    return (
      <List subheader={this.props.frolic.title} subheaderStyle={styles.frolicTitle}>
        <ListItem disabled={true}>
          <div className="inline-div">
            <FontIcon className="material-icons" style={{"color": "#666", "fontSize": "32px", "verticalAlign": "bottom"}}>visibility</FontIcon><span style={{"fontSize": "16px", "marginLeft": "4px"}}>{this.props.frolic.views}</span>
          </div>
          <div className="inline-div">
            <FontIcon className="fa fa-heart" style={styles.fontIcon}><span style={{"fontSize": "16px", "marginLeft": "4px"}}>{this.props.frolic.hearts}</span></FontIcon>
          </div>
        </ListItem>
        <ListItem leftAvatar={froAvatar} rightIconButton={followScreen}  disabled={true}>
          {this.props.frolic.channel}
        </ListItem>
      </List>
    )
  }
})
