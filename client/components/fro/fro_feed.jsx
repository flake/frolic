var {
  Card,
  CardHeader,
  Avatar,
  CardMedia,
  CardTitle,
  CardActions,
  CardText,
  Divider,
  FlatButton,
  FontIcon,
  IconButton,
  IconMenu
} = MUI;

var MenuItem = MUI.Libs.MenuItem;

FroFeed = React.createClass({
  propTypes: {
    fro: React.PropTypes.object,
    hearted: React.PropTypes.string,
    play: React.PropTypes.bool
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

  // togglePlay: function(){
  //   console.log("flayer clicked...");
  //   // videojs(this.refs.flayer).paused() ? videojs(this.refs.flayer).play() : videojs(this.refs.flayer).pause();
  // },

  _handleScreen: function(){
    // console.log("screen clicked...");
    FlowRouter.go('/screen/' + this.props.fro.screenId);
  },

  _handleShare: function(){
    FroActions.nativeShare(this.props.fro);
    // var message = {
    //   subject: "Test Subject",
    //   url: "http://www.frolicplay.com",
    //   activityTypes: ["PostToWhatsapp"]
    // };
    // window.socialmessage.send(message);
  },

  _handleWhatsApp: function(){
    FroActions.whatsapp(this.props.fro);
  },

  _handleFro: function(froId){
    console.log("handleFro " + froId);
    Session.set("froPlay", froId);
    Session.set("isPlaying", true);
  },

  render: function(){
    var froSelect = this.props.play ? "rgba(195,215,227, 0.4)" : "#FFFFFF";
    var styles = {
      froCard: {
        backgroundColor: froSelect
      },
      titleBox: {
        padding: "8px"
      },
      headerBox: {
        display: "block",
        height: "40px",
        padding: "0px"
      },
      screenAvatar: {
        marginRight: "8px",
        borderRadius: "24px",
        verticalAlign: "middle"
      },
      titleStyle: {
        fontSize: "14px",
        fontWeight: "500",
        paddingBottom: "0",
        color: APP.secondary,
        display: "inline-block",
        maxWidth: "124px",
        width: "124px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        verticalAlign: "middle"
      },
      froDesc:{
        "fontWeight": "500",
        "color": "#666",
        lineHeight: "1em",
        whiteSpace: "nowrap",
        overflow: "hidden"
      },
      subtitleStyle:{
        fontSize: "11px",
        marginTop: "0px"
      },
      // publishDate:{
      //   fontSize: "12px",
      //   marginTop: "2px",
      //   float: "right",
      //   color: "#9FB9C9"
      // },
      cardText: {
        padding: "8px",
        paddingBottom: "0"
      },
      actionBox: {
        padding: "0 8px"
      },
      fontIcon: {
        fontSize: "18px",
        color: APP.secondary,
        width: "18px",
        textAlign: "center"
      },
      whatsAppIcon: {
        color: "#43d854 !important",
        width: "16px",
        textAlign: "center",
        verticalAlign: "middle"
      },
      heartIcon: {
        fontSize: "24px",
        textAlign: "center",
        color: APP.themeRed
      },
      statIcon: {
        fontSize: "14px",
        textAlign: "center"
      },
      menuIcon: {
        color: APP.primary,
        fontSize: "18px",
        padding: "8px 4px"
      },
      fontIcon: {
        fontSize: "18px",
        color: APP.secondary,
        textAlign: "center"
      },
      menuItem:{
        paddingLeft: "48px"
      },
      frominiThumb: {
        width: "128px",
        height: "72px"
      },
      Linear: {
        display: "inline-block",
        marginRight: "4px",
        verticalAlign: "top"
      },
      froInfo: {
        display: "inline-block",
        width: "49%",
        verticalAlign: "top"
      },
      froScreen:{
        position: "relative",
        width: "128px",
        height: "72px"
      },
      froThumb:{
        zIndex: 1,
        width: "128px",
        height: "72px"
      },
      overlay:{
        position: "absolute",
        left: "15%",
        right: "15%",
        bottom: "0",
        padding: "4px",
        height: "16px",
        lineHeight: "16px",
        textAlign: "center",
        overflow: "hidden",
        zIndex: 2,
        backgroundColor: "#000",
        "-ms-filter": "progid:DXImageTransform.Microsoft.Alpha(Opacity=50)",
        filter: "alpha(opacity=40)",
        opacity: 0.4
      },
      froOver:{
        position: "absolute",
        left: "15%",
        right: "15%",
        top: "27%",
        padding: "4px",
        height: "24px",
        lineHeight: "24px",
        textAlign: "center",
        overflow: "hidden",
        zIndex: 3
      },
      overIcon:{
        color: "rgba(22, 144, 219, 0.9)",
        fontSize: "24px"
      },
      froHeart:{
        float: 'right',
        marginTop: "12%",
        // marginRight: "0px",
        zIndex: 9
      },
      reportFlag: {
        color: APP.themeRed
      }

      // titleThemed:{
      //   color: "#1690DB !important"
      // }
    };

    var iconBtnElem = (
      <IconButton
        iconClassName="material-icons"
        iconStyle={styles.menuIcon}
        style={{"padding":"0", "width":"16px", "height":"8px"}}
      >more_horiz</IconButton>);

    // var dataSetup = {
    //   controls: "true",
    //   preload: "metadata",
    //   poster: "",
    //   class: "flayer"
    // };

    var screenIcon = (<FontIcon className="fa fa-film" style={Styles.channelIcon} />);

    return (
      <Card style={styles.froCard}>
        <CardText style={styles.cardText}>
          <div style={styles.Linear}>
            <div style={styles.froScreen} onTouchTap={this._handleFro.bind(this, this.props.fro._id)}>
              <img src={this.props.fro.thumbSrc()} style={styles.froThumb} alt="fro"/>
              <div style={styles.froOver}>
                <FontIcon
                  className="fa fa-play"
                  style={styles.overIcon}/>
              </div>
            </div>
          </div>
          <div style={styles.froInfo}>
            <div>
              <div id="fi-froinfo" style={{"display": "inline-block"}}>
                <div style={{"fontWeight": "900", "color": "#444"}} className="frolic-invoke" >{this.props.fro.title}</div>
                <div style={styles.froDesc} className="frolic-invoke" >{this.props.fro.description}</div>
              </div>
            </div>
            <CardHeader
              title={this.props.fro.screenDoc().title}
              subtitle={this.props.fro.datePublished()}
              titleColor={APP.secondary}
              titleStyle={styles.titleStyle}
              subtitleStyle={styles.subtitleStyle}
              avatar={
                <Avatar
                  src={this.props.fro.screenDoc().avatar()}
                  size={27}
                  style={styles.screenAvatar} />}
              style={styles.headerBox}
              onTouchTap={this._handleScreen} >
            </CardHeader>
          </div>
          <div style={styles.froHeart}>
            <FontIcon
              className={"fa fa-" + this.props.hearted + " fro-action fro-heart"}
              style={styles.heartIcon} />
          </div>
        </CardText>

        <CardText style={styles.actionBox}>
          <div className="stat-box">
            <FontIcon
              className="fa fa-play app-icon"
              style={styles.statIcon}>
            </FontIcon>
            <span style={{"fontSize": "14px", "marginLeft": "4px"}}>{this.props.fro.views}</span>
          </div>
          <div className="stat-box">
            <FontIcon
              className="fa fa-heart fro-heart"
              style={styles.statIcon}>
            </FontIcon>
            <span style={{"fontSize": "14px", "marginLeft": "4px"}}>{this.props.fro.hearts}</span>
          </div>
          <div className="stat-box">
            <FontIcon
              className="fa fa-commenting-o app-icon fro-action frolic-invoke"
              id="fa-comments"
              style={styles.fontIcon} />
          </div>
          <div className="stat-box">
            <img
              src="/img/whats-app.png"
              style={styles.whatsAppIcon}
              onTouchTap={this._handleWhatsApp} />
          </div>
          <div className="stat-box">
            <IconMenu
              iconButtonElement={iconBtnElem}
              style={{"height": "16px", "top": "-4px"}}
              anchorOrigin={{vertical:'center', horizontal:"right"}}
              targetOrigin={{vertical:'bottom', horizontal:"right"}}>
              <MenuItem
                primaryText="Share via apps"
                leftIcon={
                  <FontIcon
                    className="fa fa-share-alt app-icon"
                    style={styles.itemIcon} />
                }
                onTouchTap={this._handleShare}
                innerDivStyle={styles.menuItem} />
              <MenuItem
                primaryText="Report or Block"
                leftIcon={
                  <FontIcon
                    className="fa fa-flag" style={styles.reportFlag}
                    style={styles.itemIcon} />
                }
                innerDivStyle={styles.menuItem} />
              <MenuItem
                primaryText="Cancel"
                innerDivStyle={styles.menuItem} />
            </IconMenu>
          </div>
        </CardText>
      </Card>
    )
  }
})

// data-setup={{'controlBar': {'muteToggle': false, 'fullscreenToggle': false}}}

// <div>
//   <div style={{"display": "inline-block"}} onTouchTap={this._handleScreen}>
    // <Avatar
    //   src={this.props.fro.screenDoc().avatar()}
    //   size={24}
    //   style={styles.screenAvatar} />
//     <div style={styles.titleStyle}>
//       {this.props.fro.screenDoc().title}
//     </div>
//   </div>
//   <div style={styles.publishDate}>
//     {this.props.fro.datePublished()}
//   </div>
// </div>
