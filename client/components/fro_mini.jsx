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
    frolic: React.PropTypes.object
  },
  getDefaultProps: function(){
    return {
      frolic: {}
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
      fontIcon: {
        fontSize: "12px",
        color: "#666",
        marginRight: "6px",
        minWidth: "48px"
      },
      miniCard: {
      },
      frominiThumb: {
        height: "96px"
      },
      miniIcon: {
        margin: 0,
        fontSize: "11px"
      },
      miniAvatar: {
        marginRight: "2px",
        verticalAlign: "middle"
      },
      miniActions: {
        paddingTop: "0"
      },
      miniHeader:{
        display: "inline-block",
        margin: 0
      },
      miniStatIcon:{
        color: "#666",
        fontSize: "12px",
        verticalAlign: "bottom",
        width: "32px",
        overflow: "hidden",
        display: "inline-block"
      },
      miniStats: {
        fontSize: "11px",
        marginLeft: "4px"
      }
    };

    var screenIcon = (<FontIcon className="fa fa-desktop" style={styles.miniIcon} />);
    var miniFroStats = (
      <div>
        <FontIcon
          className="fa fa-eye"
          style={styles.miniStatIcon}>
          <span style={styles.miniStats}>
            {this.props.frolic.views}
          </span>
        </FontIcon>
        <FontIcon
          className="fa fa-heart"
          style={styles.miniStatIcon}>
          <span style={styles.miniStats}>
            {this.props.frolic.hearts}
          </span>
        </FontIcon>
      </div>
    );

    var miniAvatar = (
      <Avatar
        backgroundColor={APP.themeGrey}
        style={styles.miniAvatar}
        icon={screenIcon}
        size={20} />
    );

    return (
      <Card style={styles.miniCard}>
        <CardMedia>
          <img src="/img/fravatar.jpg" style={styles.frominiThumb}/>
        </CardMedia>
        <CardText style={styles.cardText}>
          <div style={{"fontWeight": "900", "color": "#333", "paddingBottom": "8px"}} className="frolic-invoke" id="fi-froinfo" >{this.props.frolic.title}</div>
        </CardText>
        <CardHeader
          title={this.props.frolic.screen}
          titleStyle={styles.titleStyle}
          subtitle={miniFroStats}
          titleColor={APP.secondary}
          avatar={miniAvatar} />
      </Card>
    )
  }
});

// <CardActions style={styles.miniActions}>
//   <div className="minifro-action" >
//     <div className="mini-header">
//       <Avatar
//         backgroundColor={APP.themeGrey}
//         style={styles.miniAvatar}
//         icon={screenIcon}
//         size={20} />
//     </div>
//     <div className="mini-header" style={styles.titleStyle}>{this.props.frolic.screen}</div>
//   </div>
//   <div className="minifro-action" style={{"float": "right !important"}}>
//     <FontIcon
//       className="fa fa-eye"
//       style={styles.miniStatIcon}>
//       <span style={styles.miniStats}>
//         {this.props.frolic.views}
//       </span>
//     </FontIcon>
//     <FontIcon
//       className="fa fa-heart"
//       style={styles.miniStatIcon}>
//       <span style={styles.miniStats}>
//         {this.props.frolic.hearts}
//       </span>
//     </FontIcon>
//   </div>
// </CardActions>

// <div style={{"display": "inline-block"}}>
//
// </div>
// <div style={{"display": "inline-block"}}>
//
// </div>
