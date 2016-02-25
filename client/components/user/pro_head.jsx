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
    user: React.PropTypes.object,
    circle: React.PropTypes.bool
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
    return {};
  },

  _handleAvatar: function(){
    if(this.props.user._id !== Meteor.userId())
      return;

    ReactDOM.findDOMNode(this.refs.fileUpload).click();
  },

  _handleUpload: function(event){
    if(this.props.user._id !== Meteor.userId())
      return;

    var self = this;
    var ifile = event.target.files[0];
    ifile.owner = Meteor.userId();

    readURL(event.target, function(result){
      ProFS.insert(ifile, function(err, fileObj){
        if(err){
          console.log("ProFS failed " + err);
        }else{
          console.log("ProFS success " + fileObj._id);
          Meteor.call("userAvatar", fileObj._id, function(){});
        }
      });
    });
  },

  componentDidMount: function(){
    FroActions.renderSwipes();
  },

  _handleCircle: function(){
    console.log("[ProHead] handleCircle ");
    Session.set('circleMember', this.props.user._id);
    Session.set('openCircleMenu', true);
  },

  render: function(){
    var circleVisi = (this.props.user._id === Meteor.userId()) ? "none": "block";

    var styles = {
      proHead: {
        // height: $(window).width() * 2/3,
        width: $(window).width(),
        backgroundColor: APP.primary,
        textAlign: "center",
        paddingBottom: "8px"
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
        backgroundColor: "#fff",
        marginRight: "64px"
      },
      messageBtn:{
        marginLeft: "64px"
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
        fontSize: "14px",
        color: "#fff"
      },
      socialActions: {
        display: circleVisi,
        position: 'absolute',
        top: '8px',
        width: '100%'
      }
    };

    var circleIcon = (this.props.circle) ? 'check' : 'person_add';

    return (
      <Card style={styles.proHead}>
        <Avatar
          src={this.props.user.avatar()}
          size={64}
          style={styles.avatar}
          onTouchTap={this._handleAvatar}
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
              {this.props.user.profile.plays}
            </div>
            <div style={styles.proLine}>
              <i className="fa fa-play" ></i>&nbsp;&nbsp;plays
            </div>
          </div>
          <div className="pro-stats">
            <div style={styles.proName}>
              {this.props.user.profile.screens}
            </div>
            <div style={styles.proLine}>
              <i className="fa fa-film" ></i>&nbsp;&nbsp;screens
            </div>
          </div>
          <div className="pro-stats">
            <div style={styles.proName}>
              {this.props.user.profile.circles}
            </div>
            <div style={styles.proLine}>
              <i className="fa fa-circle-o" ></i>&nbsp;&nbsp;circles
            </div>
          </div>
        </CardText>
        <CardActions style={styles.socialActions}>
          <FlatButton
            secondary={true}
            label="Circle"
            labelPosition="after"
            style={styles.circleBtn}
            labelStyle={styles.circleBtnLabel}
            onTouchTap={this._handleCircle}
            className="circle-btn btn-shadow">
            <FontIcon
              style={styles.circleIcon}
              className="material-icons">{circleIcon}</FontIcon>
          </FlatButton>
          <FlatButton
            backgroundColor={""+APP.primary}
            secondary={true}
            label="Message"
            labelPosition="after"
            labelStyle={styles.msgLabel}
            style={styles.messageBtn}
            className="circle-btn">
            <FontIcon
              style={styles.msgIcon}
              className="fa fa-envelope" />
            </FlatButton>
        </CardActions>
        <input
          ref="fileUpload"
          type="file"
          style={{"display": "none"}}
          onChange={this._handleUpload} />
      </Card>
    )
  }
});


// setTimeout(function(){
  // var proFS = ProFS.findOne(fileObj._id);
  // var fsUrl =  proFS.url();
  // console.log("profile url " + fsUrl);
  // var aurl = (proFS) ? proFS.url() : "/img/default_user.png";
  // console.log("avatar url " + aurl);
  // Meteor.call("userAvatar", fileObj._id, function(){});
  // Dialogs.alert("upload success!");
// }, 100);
