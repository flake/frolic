var { CardMedia, CardTitle, Avatar, ListItem, IconButton } = MUI;

ProCover = React.createClass({
  propTypes: {
    cover: React.PropTypes.object,
    mediaURL: React.PropTypes.string
  },
  getDefaultProps: function(){
    return {
      cover: {},
      mediaURL: '/img/fravatar.jpg'
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
      cover: {
        height: "204px",
        maxHeight: "204px"
      },
      img: {
        height: "100%",
        width: "100%"
      },
      followIbtn: {

      }
    };

    var overlay = (
      <CardTitle
        title={this.props.cover.title}
        subtitle={this.props.cover.owner_name}
        style={{padding: "8px", paddingTop: "0"}}
      />);

    var avatar = (
      <Avatar
        src={this.props.cover.avatar_photo}
        size={56}
        style={styles.avatar}
      />);

    var rightIconBtn = (
      <IconButton
        iconClassName="material-icons"
        style={styles.followIbtn}
      >screen_share</IconButton>
    );

    var overCard = (
      <ListItem
        primaryText={this.props.cover.title}
        secondaryText={this.props.cover.owner_name}
        leftAvatar={avatar}
        rightIconButton={rightIconBtn}
        disabled={true}
      />
    );

    return (
      <CardMedia
        overlay={overCard}
        mediaStyle={styles.cover}
      >
        <img src={this.props.mediaURL} style={styles.img}/>
      </CardMedia>
    )
  }
});
