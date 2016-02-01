var {
  Card,
  Avatar,
  CardText,
  CardActions,
  FlatButton,
  RaisedButton,
  FontIcon
} = MUI;

ProHead = React.createClass({
  propTypes: {
    user: React.PropTypes.object
  },
  getDefaultProps: function(){
    return {
      user: {}
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
      proHead: {
        height: $(window).width() * 2/3,
        width: $(window).width(),
        backgroundColor: APP.primary,
        textAlign: "center"
      },
      avatar: {
        marginTop: "6%",
        backgroundColor: "#fff",
        border: "solid 2px " + APP.themeBg
      },
      proText:{
        padding: "8px"
      },
      proName: {
        fontWeight: "600",
        fontSize: "14px",
        color: "#fff",
        textShadow: "0px 1px 0px rgba(0, 0, 0, 0.4)"
      },
      proLine: {
        fontWeight: "normal",
        fontSize: "12px",
        color: APP.themeLite,
        textShadow: "0px 1px 0px rgba(0, 0, 0, 0.4)"
      },
      circleIcon: {
        fontSize: "18px",
        color: APP.primary,
        top: "4px"
      },
      circleBtn: {
        borderRadius: '18px',
        lineHeight: "28px",
      	height: "28px",
      	border: "1px solid #66a8cc",
        backgroundColor: "#fff"
      },
      circleBtnLabel: {
        fontSize: "12px",
        padding: 0,
        paddingLeft: "4px",
      },
      msgLabel: {
        color: "#fff",
        fontSize: "12px",
        padding: 0,
        paddingLeft: "4px"
      },
      msgIcon: {
        fontSize: "16px",
        color: "#fff"
      }
    };

    return (
      <Card style={styles.proHead}>
        <Avatar
          src={this.props.user.avatar}
          size={64}
          style={styles.avatar}
        />);
        <CardText style={styles.proText}>
          <div style={styles.proName}>
            {this.props.user.profile.name}
          </div>
          <div style={styles.proLine}>
            {this.props.user.profile.title}
          </div>
        </CardText>
        <CardText style={styles.proText}>

          <div className="pro-stats">
            <div style={styles.proName}>
              436
            </div>
            <div style={styles.proLine}>
              <i className="fa fa-play" ></i>&nbsp;&nbsp;plays
            </div>
          </div>
          <div className="pro-stats">
            <div style={styles.proName}>
              136
            </div>
            <div style={styles.proLine}>
              <i className="fa fa-film" ></i>&nbsp;&nbsp;screens
            </div>
          </div>
          <div className="pro-stats">
            <div style={styles.proName}>
              836
            </div>
            <div style={styles.proLine}>
              <i className="fa fa-circle-o" ></i>&nbsp;&nbsp;circles
            </div>
          </div>
        </CardText>
        <CardActions>
          <FlatButton
            secondary={true}
            label="Circle"
            labelPosition="after"
            style={styles.circleBtn}
            labelStyle={styles.circleBtnLabel}
            className="circle-btn btn-shadow">
            <FontIcon
              style={styles.circleIcon}
              className="material-icons">person_add</FontIcon>
          </FlatButton>
          <FlatButton
            backgroundColor={""+APP.primary}
            secondary={true}
            label="Message"
            labelPosition="after"
            labelStyle={styles.msgLabel}
            className="circle-btn">
            <FontIcon
              style={styles.msgIcon}
              className="fa fa-envelope" />
            </FlatButton>
        </CardActions>
      </Card>
    )
  }
});
