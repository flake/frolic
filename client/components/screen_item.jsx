var {
  Card,
  CardMedia,
  CardText,
  CardActions,
  RaisedButton,
  FontIcon,
  Avatar
} = MUI;

ScreenItem = React.createClass({
  propTypes: {
    screen: React.PropTypes.object
  },
  getDefaultProps: function(){
    return {
      screen: {
        plays: 604,
        fros: 234,
        followers: 843,
        cover: () => { return { url : () => {return "/img/froscreen.png";}};}
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

  _handleScreen: function(event){
    // console.log("screen item tap... " + event.target);
    FlowRouter.go('/screen/' + this.props.screen._id);
  },
  _handleFollow: function(event){
    event.stopPropagation();
    console.log("screen follow tap...");
  },

  render: function(){
    var mediaHeight = $(window).width() * 3/4;

    var styles = {
      screenMedia: {
        height: mediaHeight,
        width: "100%"
      },
      cardText: {
        padding: "8px",
        paddingBottom: 0
      },
      screenItem: {
        paddingLeft: "90px"
      },
      screenTitle: {
        fontWeight: "800",
        color: "#444",
        fontSize: "12px",
        lineHeight: "1em",
        height: "14px",
        overflow: "hidden"
      },
      screenDesc: {
        fontWeight: "normal",
        color: "#666",
        fontSize: "12px",
        lineHeight: "1em",
        height: "13px",
        overflow: "hidden"
      },
      screenImg: {
        height: "96px"
      },
      screenAvatar:{
        borderRadius: "6px"
      },
      cardStats:{
        padding: "4px 8px"
      },
      followIcon: {
        fontSize: "16px",
        color: "#fff",
        top: "4px"
      },
      followRaised: {
        // borderRadius: "18px",
      	lineHeight: "24px",
      	height: "24px",
        minWidth: "64px",
      	width: "72px",
      	margin: "8px",
        backgroundColor: APP.primary
      },
      followLabel: {
        fontSize: "10px",
        fontWeight: "600",
        padding: "0",
        paddingLeft: "6px"
      },
      screenOverlay: {
        paddingTop: "0 !important",
        textAlign: "right"
      }
    };

    var screenAvatar = (
      <Avatar
        src={this.props.screen.cover().url()}
        style={styles.screenAvatar}
        size={64} />
    );

    var screenOverlay = (
      <RaisedButton
        secondary={true}
        label="Follow"
        labelPosition="after"
        style={styles.followRaised}
        labelStyle={styles.followLabel}
        className="follow-raised"
        onTouchTap={this._handleFollow} >
        <FontIcon
          style={styles.followIcon}
          className="material-icons">screen_share</FontIcon>
      </RaisedButton>
  );



    return (
      <Card onTouchTap={this._handleScreen}>
        <CardMedia
          overlay={screenOverlay}
          overlayContentStyle={styles.screenOverlay} >
          <img
            src={""+this.props.screen.cover().url()}
            style={styles.screenImg}/>
        </CardMedia>
        <CardText style={styles.cardText}>
          <div style={styles.screenTitle}>
            {this.props.screen.title}
          </div>
          <div style={styles.screenDesc}>
            {this.props.screen.description}
          </div>
        </CardText>
        <CardActions style={styles.cardStats}>
          <div className="screen-stats">
            <i className="fa fa-video-camera"></i>&nbsp;&nbsp;{this.props.screen.fros}
          </div>
          <div className="screen-stats">
            <i className="fa fa-play"></i>&nbsp;&nbsp;{this.props.screen.plays}
          </div>
          <div className="screen-stats">
            <i className="fa fa-users"></i>&nbsp;&nbsp;{this.props.screen.followers}
          </div>
        </CardActions>
      </Card>
    )
  }
});


// <ListItem
//   leftAvatar={screenAvatar}
//   innerDivStyle={styles.screenItem}>
//   <div>
//     <div>{this.props.screen.title}</div>
//     <div>{this.props.screen.description}</div>
//   </div>
// </ListItem>
