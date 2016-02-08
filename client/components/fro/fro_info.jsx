var {
  IconButton,
  List,
  ListItem,
  Divider,
  Avatar,
  FontIcon,
  Card,
  CardText
} = MUI;

FroInfo = React.createClass({
  PropTypes: {
    fro: React.PropTypes.object,
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

  _handleHeart: function(){
    Meteor.call("hearted", this.props.fro._id);
  },

  _handleWhatsApp: function(){
    FroActions.whatsapp(this.props.fro);
  },

  _handleShare: function(){
    FroActions.nativeShare(this.props.fro);
  },

  render: function(){
    var styles = {
      fontIcon: {
        fontSize: "14px",
        color: APP.primary,
        minWidth: "14px",
        verticalAlign: "middle",
        marginRight: "6px"
      },
      froTitle: {
        fontSize: "16px",
        color: "#333",
        fontWeight: "600"
      },
      froDesc: {
        fontSize: "12px",
        color: "#666",
        fontWeight: "500"
      },
      infoCard:{
        padding: "8px",
        marginBottom: "4px"
      },
      statBox: {
        verticalAlign: "top",
        width: "128px",
      },
      statStyle:{
        display: "inline-block",
        fontSize: "12px",
        color: "#999",
        marginRight: "2px",
        minWidth: "16px"
      },
      statLabel:{
        fontSize: "12px",
        color: "#999"
      },
      statBar: {
        // marginTop: "8px",
      },
      statComp: {
        display: "inline-block",
        margin: "0 6px !important"
      },
      whatsAppIcon: {
        backgroundColor: "#43d854",
        color: "#fff",
        padding: "4px",
        borderRadius: "2px",
        fontSize: "20px"
      },
      shareAltIcon: {
        backgroundColor: "initial",
        color: APP.secondary,
        padding: "4px",
        borderRadius: "2px",
        fontSize: "20px"
      },
      moreMenuIcon: {
        backgroundColor: "initial",
        color: "initial",
        padding: "4px",
        borderRadius: "2px",
        fontSize: "20px"
      },
      heartIcon: {
        color: APP.primary,
        fontSize: "27px",
        marginTop: "8px"
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
        <Card style={styles.infoCard}>
          <cardText>
            <div style={styles.froTitle}>
              {this.props.fro.title}
            </div>
            <div style={styles.froDesc}>
              {this.props.fro.description}
            </div>
          </cardText>
          <Divider style={{"margin": "8px 0 0 !important"}}/>
          <cardText style={styles.statBar}>
            <div className="frolic-stats">
              <div style={styles.statBox}>
                <div style={styles.statStyle}>{this.props.fro.hearts} </div>
                <FontIcon className="fa fa-heart" style={styles.fontIcon}></FontIcon>
                <span style={styles.statLabel}>hearts</span>
              </div>
              <div style={styles.statBox}>
                <div style={styles.statStyle}>{this.props.fro.views} </div>
                <FontIcon className="fa fa-play" style={styles.fontIcon}></FontIcon>
                <span style={styles.statLabel}>plays</span>
              </div>
            </div>
            <div className="frolic-stats">
              <FontIcon
                className={"fa fa-" + this.props.hearted }
                style={styles.heartIcon}
                onTouchTap={this._handleHeart}></FontIcon>
            </div>
            <div className="frolic-right">
              <div style={styles.statComp}>
                <FontIcon
                  className="fa fa-whatsapp"
                  style={styles.whatsAppIcon}
                  onTouchTap={this._handleWhatsApp}></FontIcon>
              </div>
              <div style={styles.statComp}>
                <FontIcon
                  className="fa fa-share-alt"
                  style={styles.shareAltIcon}
                  onTouchTap={this._handleShare}></FontIcon>
              </div>
              <div style={styles.statComp}>
                <FontIcon
                  className="material-icons"
                  style={styles.moreMenuIcon}
                  onTouchTap={this._handleMore}>more_vert</FontIcon>
              </div>
            </div>
          </cardText>
        </Card>
        <div>
          <div className="frolic-stats">
            <ScreenItem screen={this.props.fro.screenDoc()} />
          </div>
          <div className="frolic-stats procard-litem" style={{"marginLeft":"5px !important"}}>
            <ProCard user={this.props.fro.owner()} />
          </div>
        </div>
      </div>
    )
  }
});

// <div>
// <List subheader={this.props.fro.title} subheaderStyle={styles.froTitle}>
//   <ListItem disabled={true} style={{"padding" : "8px"}}>
//     <div className="frolic-stats">
//       <FontIcon className="fa fa-play" style={styles.fontIcon}></FontIcon><span style={{"fontSize": "16px", "marginLeft": "4px"}}>{this.props.fro.views}</span>
//     </div>
//     <div className="frolic-stats">
//       <FontIcon className={"fa fa-" + this.props.hearted } style={styles.fontIcon}></FontIcon><span style={{"fontSize": "16px"}}>{this.props.fro.hearts}</span>
//     </div>
//   </ListItem>
//   <ListItem disabled={true} leftAvatar={froAvatar} rightIconButton={followScreen}>
//     {this.props.fro.screenDoc().title}
//   </ListItem>
//   <ListItem disabled={true}>
//     {this.props.fro.description}
//   </ListItem>
// </List>
// <div style={{"paddingTop": "4px"}}>
//   <UserCard user={this.props.fro.owner()} />
// </div>
// </div>
