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
        plays: 0,
        fros: 0,
        followers: 0,
        cover: () => { return "/img/froscreen.png";},
        avatar: () => {return "/img/froscreen.png";}
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
    return {
      follow: false
    }
  },

  _handleScreen: function(event){
    // console.log("screen item tap... " + event.target);
    FlowRouter.go('/screen/' + this.props.screen._id);
  },
  _handleFollow: function(event){
    event.stopPropagation();
    console.log("screen follow tap...");
    if(this.props.screen.isFollower()){
      Meteor.call('unfollow', this.props.screen._id, function(err){
        if(err){
          console.log("screen unfollow error ", err);
        }
      });
    }else{
      Meteor.call('followScreen', this.props.screen._id, function(err){
        if(err){
          console.log("screen follow error ", err);
        }
      });
    }
  },

  render: function(){
    var wid = $(window).width();
    var mediaWidth = wid * 1/2;
    var mediaHeight = wid * 3/4;

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
        overflow: "hidden",
        whiteSpace: "nowrap"
      },
      screenDesc: {
        fontWeight: "normal",
        color: "#666",
        fontSize: "12px",
        lineHeight: "1em",
        height: "13px",
        overflow: "hidden",
        whiteSpace: "nowrap"
      },
      screenImg: {
        height: $(window).width() * (80/360)
      },
      cardStats:{
        padding: "4px 8px"
      },
      followIcon: {
        fontSize: "16px",
        color: "#fff",
        top: "3px"
      },
      followRaised: {
        // borderRadius: "18px",
      	lineHeight: "24px",
      	height: "24px",
        minWidth: "64px",
      	width: "88px",
      	margin: "8px",
        padding: "0 4px",
        backgroundColor: APP.primary
      },
      followLabel: {
        fontSize: "10px",
        fontWeight: "600",
        padding: "0",
        paddingLeft: "6px",
        top: "-1px"
      },
      screenAvatar:{
        borderRadius: "18px",
        position: "absolute",
        top: "-12px",
        left: "8px",
        border: "2px solid #fff"
      },
      screenOverlay: {
        paddingTop: "0 !important",
        textAlign: "right",
        minHeight: "40px"
      }
    };

    var followLabel = this.props.screen.isFollower() ? "Un Follow" : "Follow";
    var followIcon = this.props.screen.isFollower() ? "stop_screen_share" : "screen_share";
    // console.log("screen item %s follow label: %s & icon: %s ", this.props.screen.title, followLabel, followIcon);
    var screenOverlay = (
      <div>
        <Avatar
          src={this.props.screen.avatar()}
          style={styles.screenAvatar}
          size={34} />
        {
          (() => {
            if(!this.props.screen.isOwner()){
              return (
                <RaisedButton
                  secondary={true}
                  label={followLabel}
                  labelPosition="after"
                  style={styles.followRaised}
                  labelStyle={styles.followLabel}
                  className="follow-raised"
                  onTouchTap={this._handleFollow} >
                  <FontIcon
                    style={styles.followIcon}
                    className="material-icons">{followIcon}</FontIcon>
                </RaisedButton>
              )
            }
          })()
        }
      </div>
  );



    return (
      <Card onTouchTap={this._handleScreen} style={{"maxWidth": "168px"}}>
        <CardMedia
          overlay={screenOverlay}
          overlayContentStyle={styles.screenOverlay} >
          <img
            src={""+this.props.screen.cover()}
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
