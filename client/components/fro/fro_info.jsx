var {
  IconButton,
  List,
  ListItem,
  ListDivider,
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

    var screenIcon = (<FontIcon className="fa fa-film"/>);
    var froAvatar = (<Avatar backgroundColor={APP.themeGrey} icon={screenIcon} style={{borderRadius: "3px"}} />);
    var followScreen = (<IconButton iconClassName="material-icons" iconStyle={Styles.listIconRight}>add_to_queue</IconButton>);

    return (
      <List subheader={this.props.fro.title} subheaderStyle={styles.froTitle}>
        <ListItem disabled={true} style={{"padding" : "8px"}}>
          <div className="frolic-stats">
            <FontIcon className="material-icons" style={styles.fontIcon}>visibility</FontIcon><span style={{"fontSize": "16px", "marginLeft": "4px"}}>{this.props.fro.views}</span>
          </div>
          <div className="frolic-stats">
            <FontIcon className={"fa fa-" + this.props.hearted } style={styles.fontIcon}></FontIcon><span style={{"fontSize": "16px"}}>{this.props.fro.hearts}</span>
          </div>
        </ListItem>
        <ListDivider inset={true} />
        <ListItem leftAvatar={froAvatar} rightIconButton={followScreen}  disabled={true}>
          {this.props.fro.channel}
        </ListItem>
        <ListDivider inset={true} />
        <ListItem>
          {this.props.description} blah blah ...
        </ListItem>
        <ListDivider inset={true} />

      </List>
    )
  }
})