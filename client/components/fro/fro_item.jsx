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

  render: function(){
    var styles = {
      titleBox: {
        padding: "8px"
      },
      titleStyle: {
        fontSize: "14px",
        fontWeight: "500",
        paddingBottom: "0"
      },
      froDesc:{
        "fontWeight": "500",
        "color": "#666",
        lineHeight: "1em",
        height: "1.6em",
        overflow: "hidden"
      },
      subtitleStyle:{
        fontSize: "12px",
        marginTop: "2px"
      },
      cardText: {
        padding: "8px",
        paddingBottom: "0"
      },
      actionBox: {
        paddingTop: "0"
      },
      fontIcon: {
        fontSize: "12px",
        color: APP.secondary,
        width: "12px",
        textAlign: "center"
      },
      screenAvatar: {
        marginRight: "8px",
        borderRadius: "24px"
      }
      // titleThemed:{
      //   color: "#1690DB !important"
      // }
    };

    var iconBtnElem = (<IconButton iconClassName="material-icons" iconStyle={ {color: APP.primary} }>more_vert</IconButton>);

    // var dataSetup = {
    //   controls: "true",
    //   preload: "metadata",
    //   poster: "",
    //   class: "flayer"
    // };

    var screenIcon = (<FontIcon className="fa fa-film" style={Styles.channelIcon} />);

    return (
      <Card>
        <CardMedia>
          <video src={this.props.src} className='video-js vjs-default-skin flayer' controls preload="metadata" poster="" height="192" data-setup="{'controlBar': {'muteToggle': false, 'fullscreenToggle': false}}" >
            <p className='vjs-no-js'>To play this video, you need HTML5 supportted browser</p>
          </video>
          <div class="my-video-overlay"></div>
        </CardMedia>
        <CardText style={styles.cardText}>
          <div id="fi-froinfo">
            <div style={{"fontWeight": "900", "color": "#444"}} className="frolic-invoke" >{this.props.fro.title}</div>
            <div style={styles.froDesc} className="frolic-invoke" >{this.props.fro.description}</div>
          </div>
          <div style={{"display": "inline-block"}} >
            <CardHeader
              title={this.props.fro.screenDoc().title}
              titleStyle={styles.titleStyle}
              subtitle={this.props.fro.datePublished()}
              subtitleStyle={styles.subtitleStyle}
              titleColor={APP.secondary}
              avatar={
                <Avatar
                  src={this.props.fro.screenDoc().avatar()}
                  size={36}
                  style={styles.screenAvatar} />}
              style={Styles.headerBox}
              onClick={this._handleScreen} />
          </div>
          <div className="header-right">
              <div className="stat-box">
                <FontIcon
                  className="fa fa-play"
                  style={styles.fontIcon}>
                </FontIcon>
                <span style={{"fontSize": "11px", "marginLeft": "4px"}}>{this.props.fro.views}</span>
              </div>
              <div className="stat-box">
                <FontIcon
                  className="fa fa-heart"
                  style={styles.fontIcon}>
                </FontIcon>
                <span style={{"fontSize": "11px", "marginLeft": "4px"}}>{this.props.fro.hearts}</span>
              </div>
          </div>
        </CardText>
        <CardActions style={styles.actionBox}>
          <FlatButton secondary={true} className="fro-action fro-heart">
            <FontIcon className={"fa fa-" + this.props.hearted + " app-icon"} />
          </FlatButton>
          <FlatButton secondary={true} className="fro-action frolic-invoke" id="fi-comments">
            <FontIcon className="fa fa-commenting-o app-icon" />
          </FlatButton>
          <FlatButton secondary={true} className="fro-action">
            <FontIcon className="fa fa-share-alt app-icon" />
          </FlatButton>
          <IconMenu iconButtonElement= {iconBtnElem} openDirection="top-left" >
            <MenuItem primaryText="Add to List" />
            <MenuItem primaryText="Report or Block" />
            <MenuItem primaryText="Cancel" />
          </IconMenu>
        </CardActions>
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
