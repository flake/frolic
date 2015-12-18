var {
  CardMedia,
  CardTitle,
  Avatar,
  ListItem,
  RaisedButton,
  FontIcon
} = MUI;

ProCover = React.createClass({
  propTypes: {
    screen: React.PropTypes.object
  },
  getDefaultProps: function(){
    return {
      screen: {
        title: 'Set Title',
        description: 'Description ...',
        cover: () => {return '/img/froscreen.png';},
        avatar: () => {return '/img/froscreen.png';}
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

  _handleFollow: function(){

  },

  render: function(){

    var styles = {
      cover: {
        height: "204px",
        maxHeight: "204px"
      },
      avatar: {
        border: "2px solid " + APP.themeLite,
        top: '-36px',
        left: "8px"
      },
      img: {
        height: "100%",
        width: "100%"
      },
      listInnerDiv:{
        color: "#fff",
        padding: '8px 72px'
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
      	width: "72px",
      	margin: "8px",
        backgroundColor: APP.primary,
        top: '4px'
      },
      followLabel: {
        fontSize: "10px",
        fontWeight: "600",
        padding: "0",
        paddingLeft: "6px",
        top: "-1px"
      }
    };

    // var overlay = (
    //   <CardTitle
    //     title={this.props.screen.title}
    //     subtitle={this.props.screen.description}
    //     style={{padding: "8px", paddingTop: "0"}}
    //   />);

    var avatar = (
      <Avatar
        src={this.props.screen.avatar()}
        size={56}
        style={styles.avatar}
      />);

    var rightIconBtn = (
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

    var description = (
      <div style={{"color": "#fff"}}>{this.props.screen.description}</div>
    );

    var overCard = (
      <ListItem
        primaryText={this.props.screen.title}
        secondaryText={description}
        leftAvatar={avatar}
        rightIconButton={rightIconBtn}
        disabled={true}
        innerDivStyle={styles.listInnerDiv}
        style={{"color": "#fff"}}
      />
    );

    return (
      <CardMedia
        overlay={overCard}
        mediaStyle={styles.cover}
      >
        <img src={this.props.screen.cover()} style={styles.img}/>
      </CardMedia>
    )
  }
});
