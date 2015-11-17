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
      headerBox: {
        height: "64px",
        paddingBottom: "8px"
      },
      titleBox: {
        padding: "8px"
      },
      titleStyle: {
        fontSize: "14px",
        padding: "8px",
        fontWeight: "500",
        paddingBottom: "0"
      },
      actionBox: {
        paddingTop: "0"
      }
      // titleThemed:{
      //   color: "#1690DB !important"
      // }
    };

    var iconBtnElem = (<IconButton iconClassName="material-icons" iconStyle={ {color: APP.primary} }>more_vert</IconButton>);
    return (
      <Card>
        <CardHeader
          title={this.props.fro.owner().profile.name}
          subtitle={this.props.fro.datePublished()}
          titleColor={APP.secondary}
          avatar={<Avatar backgroundColor={APP.themeGrey}>A</Avatar>}
          style={styles.headerBox} >

          <div className="header-right">
            <div><span>12345</span><i className="fa fa-eye"></i></div>
            <div><span>1234</span><i className="fa fa-heart"></i></div>
          </div>
        </CardHeader>
        <CardMedia>
          <video src={this.props.src} className='video-js vjs-default-skin' controls preload='auto' poster='' data-setup='{}' height="194" onclick="this.play()">
            <p className='vjs-no-js'>To view this video please enable JavaScript, and consider upgrading to a web browser that <a href='http://videojs.com/html5-video-support/' target='_blank'>supports HTML5 video</a></p>
          </video>
        </CardMedia>
        <CardText style={styles.titleStyle}>
          {this.props.fro.title}
        </CardText>
        <CardActions style={styles.actionBox}>
          <FlatButton secondary={true} label="" labelPosition="after" className="fro-action">
            <FontIcon className="fa fa-heart-o app-icon" />
          </FlatButton>
          <FlatButton secondary={true} label="" labelPosition="after" className="fro-action">
            <FontIcon className="fa fa-commenting-o app-icon" />
          </FlatButton>
          <FlatButton secondary={true} label="" labelPosition="after" className="fro-action">
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
