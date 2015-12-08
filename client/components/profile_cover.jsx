var { CardMedia, CardTitle } = MUI;

ProfileCover = React.createClass({
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
      }
    };

    var overlay = (
      <CardTitle
        title={this.props.cover.title}
        subtitle={this.props.cover.owner_name}
        style={{padding: "8px", paddingTop: "0"}}
      />);

    return (
      <CardMedia
        overlay={overlay}
        mediaStyle={styles.cover}
      >
        <img src={this.props.mediaURL} style={styles.img}/>
      </CardMedia>
    )
  }
});
