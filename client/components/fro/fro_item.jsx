var {
  Card,
  CardHeader,
  Avatar,
  CardMedia,
  CardTitle,
  CardActions,
  CardText,
  FlatButton,
  FontIcon,
  IconButton,
  IconMenu
} = MUI;

var MenuItem = MUI.Libs.MenuItem;

FroItem = React.createClass({
  propTypes: {
    fro: React.PropTypes.object,
    src: React.PropTypes.string,
    hearted: React.PropTypes.string
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

  togglePlay: function(){
    console.log("flayer clicked...");
    videojs(this.refs.flayer).paused() ? videojs(this.refs.flayer).play() : videojs(this.refs.flayer).pause();
  },

  _handleScreen: function(){
    console.log("screen clicked...");
    FlowRouter.go('/screen/' + this.props.fro.screenId);
  },

  _handleShare: function(){
    console.log("social share handle... ");
    var msg = 'Message via Apps from frolic';
    var img = this.props.fro.thumbSrc(); /* img */
    var url = "http://frolicplay.com/"+this.props.fro._id; /* url */
    var whatsUp = function(){
      console.log('share ok');
    };
    var whatsFail = function(errormsg){
      console.log(errormsg);
    };
    window.plugins.socialsharing.share(null, null, url, whatsUp, whatsFail);
    // var message = {
    //   subject: "Test Subject",
    //   url: "http://www.frolicplay.com",
    //   activityTypes: ["PostToWhatsapp"]
    // };
    // window.socialmessage.send(message);
  },

  _handleWhatsApp: function(){
    var msg = 'Message via WhatsApp from frolic';
    var img = this.props.fro.thumbSrc(); /* img */
    var url = "http://frolicplay.com/"+this.props.fro._id; /* url */
    var whatsUp = function(){
      console.log('share ok');
    };
    var whatsFail = function(errormsg){
      console.log(errormsg);
    };
    window.plugins.socialsharing.shareViaWhatsApp(null, img, url, whatsUp, whatsFail);
  },

  render: function(){
    var styles = {
      titleBox: {
        padding: "8px"
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
        display: "inline-block"
      },
      froDesc:{
        "fontWeight": "500",
        "color": "#666",
        lineHeight: "1em",
        overflow: "hidden"
      },
      subtitleStyle:{
        fontSize: "12px",
        marginTop: "2px"
      },
      publishDate:{
        fontSize: "12px",
        marginTop: "2px",
        float: "right",
        color: "#9FB9C9"
      },
      cardText: {
        padding: "8px",
        paddingBottom: "0"
      },
      actionBox: {
        padding: "8px",
        paddingTop: "0"
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
        textAlign: "center"
      },
      heartIcon: {
        fontSize: "24px",
        textAlign: "center"
      },
      statIcon: {
        fontSize: "14px",
        color: APP.secondary,
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
      <Card>
        <CardMedia style={{"backgroundColor":"#000"}}>
          <video
            src={this.props.src}
            className='video-js vjs-default-skin flayer'
            controls
            preload="metadata"
            poster={this.props.fro.thumbSrc()}
            height="192"
            data-setup={{'controlBar': {'muteToggle': false, 'fullscreenToggle': false}}} >
            <p className='vjs-no-js'>To play this video, you need HTML5 supportted browser</p>
          </video>
        </CardMedia>
        <CardText style={styles.cardText}>
          <div>
            <div id="fi-froinfo" style={{"display": "inline-block"}}>
              <div style={{"fontWeight": "900", "color": "#444"}} className="frolic-invoke" >{this.props.fro.title}</div>
              <div style={styles.froDesc} className="frolic-invoke" >{this.props.fro.description}</div>
            </div>
            <div style={{"float": "right", "margin-right":"8px"}}>
              <FontIcon
                className={"fa fa-" + this.props.hearted + " app-icon fro-action fro-heart"}
                style={styles.heartIcon} />
            </div>
          </div>
          <div>
            <div style={{"display": "inline-block"}} onTouchTap={this._handleScreen}>
              <Avatar
                src={this.props.fro.screenDoc().avatar()}
                size={24}
                style={styles.screenAvatar} />
              <div style={styles.titleStyle}>
                {this.props.fro.screenDoc().title}
              </div>
            </div>
            <div style={styles.publishDate}>
              {this.props.fro.datePublished()}
            </div>
          </div>
        </CardText>
        <CardText style={styles.actionBox}>
          <div className="stat-box">
            <FontIcon
              className="fa fa-play"
              style={styles.statIcon}>
            </FontIcon>
            <span style={{"fontSize": "14px", "marginLeft": "4px"}}>{this.props.fro.views}</span>
          </div>
          <div className="stat-box">
            <FontIcon
              className="fa fa-heart"
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
              anchorOrigin={{vertical:'middle', horizontal:"right"}}
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
                    className="fa fa-flag" style={{"color": APP.themeRed}}
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

// <CardHeader
//   title={this.props.fro.owner().profile.fullname}
//   subtitle={this.props.fro.datePublished()}
//   titleColor={APP.secondary}
//   avatar={<Avatar backgroundColor={APP.themeGrey}>A</Avatar>}
//   style={styles.headerBox} >
//
//   <div className="header-right">
//     <div><span>12345</span><i className="fa fa-eye"></i></div>
//     <div><span>1234</span><i className="fa fa-heart"></i></div>
//   </div>
// </CardHeader>
