var {
  Card,
  CardHeader,
  CardMedia,
  CardText,
  CardActions,
  Avatar,
  FontIcon
} = MUI;

FroMini = React.createClass({
  propTypes: {
    fro: React.PropTypes.object
  },
  getDefaultProps: function(){
    return {
      fro: {}
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

  _handleTouch: function(){
    // console.log("mini fro card touched...");
    // Meteor.call("newPlay", this.props.fro._id, function(e, r){});
    FlowRouter.go("/fro/"+this.props.fro._id);
  },

  render: function(){

    var styles = {
      titleStyle: {
        fontSize: "12px",
        fontWeight: "500",
        paddingBottom: "0",
        maxWidth: "64px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        verticalAlign: "middle",
        color: APP.primary
      },
      subtitleStyle:{
        fontSize: "12px",
        marginTop: "2px"
      },
      cardText: {
        padding: "8px",
        paddingBottom: "0"
      },
      frominiThumb: {
        height: "96px"
      },
      miniIcon: {
        margin: 0,
        fontSize: "11px"
      },
      miniAvatar: {
        marginRight: "4px",
        verticalAlign: "middle"
      },
      miniHeader:{
        padding: "8px",
        paddingTop: "0",
        height: "32px"
      },
      miniStatIcon:{
        color: APP.secondary,
        fontSize: "9px",
        width: "32px",
        overflow: "hidden",
        display: "inline-block",
        marginRight: "2px"
      },
      miniStats: {
        fontSize: "9px",
        marginLeft: "4px",
        color: "#666"
      },
      miniFroStats: {
        fontSize: "8px"
      },
      miniFroTitle: {
        fontWeight: "800",
        color: "#444",
        paddingBottom: "8px",
        fontSize: "12px",
        lineHeight: "1em",
        height: "1.6em",
        overflow: "hidden"
      },
      miniActions: {
        paddingBottom: 0
      }
    };

    var screenIcon = (<FontIcon className="fa fa-film" style={styles.miniIcon} />);
    var miniFroStats = (
      <div>
        <FontIcon
          className="fa fa-play"
          style={styles.miniStatIcon}>
          <span style={styles.miniStats}>
            {this.props.fro.views}
          </span>
        </FontIcon>
        <FontIcon
          className="fa fa-heart"
          style={styles.miniStatIcon}>
          <span style={styles.miniStats}>
            {this.props.fro.hearts}
          </span>
        </FontIcon>
      </div>
    );

    var miniAvatar = (
      <Avatar
        backgroundColor={APP.themeGrey}
        style={styles.miniAvatar}
        icon={screenIcon}
        size={21} />
    );

    return (
      <Card style={styles.miniCard} onTouchTap={this._handleTouch}>
        <CardMedia>
          <img src={this.props.fro.thumbSrc()} style={styles.frominiThumb}/>
        </CardMedia>
        <CardText style={styles.cardText}>
          <div style={styles.miniFroTitle} >{this.props.fro.title}</div>
        </CardText>
        <CardActions style={styles.miniActions}>
          <div className="minifro-action mini-avatar-space">
            <div className="mini-header">
              <Avatar
                src={this.props.fro.screenDoc().avatar()}
                style={styles.miniAvatar}
                size={21} />
            </div>
            <div className="mini-header" style={styles.titleStyle}>{this.props.fro.screenDoc().title}</div>
          </div>
          <div className="minifro-action mini-stat-right">
            <FontIcon
              className="fa fa-play"
              style={styles.miniStatIcon}>
              <span style={styles.miniStats}>
                {this.props.fro.views}
              </span>
            </FontIcon>
            <FontIcon
              className="fa fa-heart"
              style={styles.miniStatIcon}>
              <span style={styles.miniStats}>
                {this.props.fro.hearts}
              </span>
            </FontIcon>
          </div>
        </CardActions>
      </Card>
    )
  }
});


        // <CardHeader
        //   title={this.props.fro.screen}
        //   titleStyle={styles.titleStyle}
        //   subtitle={miniFroStats}
        //   subtitleStyle={styles.miniFroStats}
        //   titleColor={APP.secondary}
        //   avatar={miniAvatar}
        //   style={styles.miniHeader} />


// <div style={{"display": "inline-block"}}>
//
// </div>
// <div style={{"display": "inline-block"}}>
//
// </div>
