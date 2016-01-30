var { CardMedia } = MUI;

FroScreen = React.createClass({
  propTypes: {
    src: React.PropTypes.string,
    thumb: React.PropTypes.string
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
    return (
      <CardMedia>
        <video
          src={this.props.src}
          className='video-js vjs-default-skin flayer'
          controls
          preload="metadata"
          poster={this.props.thumb}
          height="194" >
          <p className='vjs-no-js'>To play this video, you need HTML5 supportted browser</p>
        </video>
      </CardMedia>
    )
  }
});
