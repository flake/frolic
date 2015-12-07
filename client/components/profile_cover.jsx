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

    var overlay = (
      <CardTitle
        title={this.props.cover.title}
        subtitle={this.props.cover.owner_name}
      />);

    return (
      <CardMedia
        overlay={overlay}
      >
        <img src={this.props.mediaURL} />
      </CardMedia>
    )
  }
});
