var {
  CardMedia,
  FontIcon
} = MUI;

FroScreen = React.createClass({
  propTypes: {
    src: React.PropTypes.string,
    thumb: React.PropTypes.string,
    play: React.PropTypes.boolean
  },
  getDefaultProps: function(){
    return {
      src: "",
      thumb: "/img/froscreen.png",
      play: false
    };
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

  _handlePlayer: function(){
    var froPlayer = videojs('fro-player');
    if(froPlayer.paused()){
      froPlayer.play();
      Session.set("isPlaying", true);
    }else{
      froPlayer.pause();
      Session.set("isPlaying", false);
    }
  },

  render: function(){
    var display = this.props.play ? "none" : "block";
    var styles = {
      froOverlay: {
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        top: 0,
        left: 0,
        display: display
      },
      overBtn: {
        backgroundColor: "rgba(22, 144, 219, 0.9)",
        padding: "16px",
        border: "2px solid #FFF",
        borderRadius: "6px",
        width: "64px",
        textAlign: "center",
        position: "relative",
        top: "32%",
        left: "36%"
      },
      overIcon: {
        color: "#FFF",
        fontSize: "36px"
      }
    };

    return (
      <CardMedia onTouchTap={this._handlePlayer}>
        <video
          id="fro-player"
          src={this.props.src}
          className='video-js vjs-default-skin vjs-big-play-centered flayer'
          preload="metadata"
          autoplay={true}
          poster={this.props.thumb}
          height="194"
          onplay={this._onPlay}
          onpause={this._onPause} >
          <p className='vjs-no-js'>To play this video, you need HTML5 supportted browser</p>
        </video>
        <div style={styles.froOverlay}>
          <div style={styles.overBtn}
            onTouchTap={this._handlePlayer}>
            <FontIcon
              className="fa fa-play"
              style={styles.overIcon} />
          </div>
        </div>
      </CardMedia>
    )
  }
});
