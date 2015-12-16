var {
  Card,
  CardMedia,
  CardText,
  Avatar
} = MUI;

ScreenItem = React.createClass({
  propTypes: {
    screenObj: React.PropTypes.object
  },
  getDefaultProps: function(){
    return {
      screenObj: {
        cover_photo: "/img/fravatar.jpg"
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

  render: function(){
    var mediaHeight = $(window).width() * 3/4;

    var styles = {
      screenMedia: {
        height: mediaHeight,
        width: "100%"
      },
      cardText: {
        padding: "8px",
        paddingBottom: "0"
      },
      screenItem: {
        paddingLeft: "90px"
      },
      screenTitle: {
        fontWeight: "800",
        color: "#444",
        paddingBottom: "8px",
        fontSize: "12px",
        lineHeight: "1em",
        height: "1.6em",
        overflow: "hidden"
      },
      screenImg: {
        height: "96px"
      },
      screenAvatar:{
        borderRadius: "6px"
      }
    };

    var screenAvatar = (
      <Avatar
        src={this.props.screenObj.cover().url()}
        style={styles.screenAvatar}
        size={64} />
    );

    return (
      <Card>
        <CardMedia>
          <img
            src={""+this.props.screenObj.cover().url()}
            style={styles.screenImg}/>
        </CardMedia>
        <CardText style={styles.cardText}>
          <div style={styles.screenTitle}>{this.props.screenObj.title}</div>
        </CardText>
      </Card>
    )
  }
});


// <ListItem
//   leftAvatar={screenAvatar}
//   innerDivStyle={styles.screenItem}>
//   <div>
//     <div>{this.props.screenObj.title}</div>
//     <div>{this.props.screenObj.description}</div>
//   </div>
// </ListItem>
