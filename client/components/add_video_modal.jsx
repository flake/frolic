var { AppCanvas, AppBar, CardMedia, IconButton, Dialog } = mui;

AddVideoModal = React.createClass({
  //IMPORTANT SET CHILD CONTEXT
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function(){
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  getInitialState: function(){
    return { }
  },

  componentWillUpdate: function(nextProps, nextState){
    //this.refs.vidsrc.src = nextProps.src;
    if(nextProps.show == true){
      this.refs.AddVideoModal.show();
    }else{
      this.refs.AddVideoModal.dismiss();
    }
    // if(nextProps.vidsrc !== this.props.vidsrc){
    //   console.log("vidsrc updated");
    //   var myPlayer = videojs('add-video-player');
    //   myPlayer.src(nextProps.vidsrc);
    //   myPlayer.load();
    // }
  },

  /*AttachVideo: function(){
    console.log(" ref called ", this);
  }, */

/*  componentDidMount: function(){
    //console.log("ref modal ",this.refs);
    //console.log("ref vid ", React.findDOMNode(this.refs.AttachVideo));
    var video, wrapper;
    wrapper = document.createElement('div');
    wrapper.innerHTML = "<video id='add-video-player' class='video-js vjs-default-skin' controls preload='auto' poster='' data-setup='{}'><source src='http://video-js.zencoder.com/oceans-clip.mp4' type='video/mp4' /><p class='vjs-no-js'>To view this video please enable JavaScript, and consider upgrading to a web browser that <a href='http://videojs.com/html5-video-support/' target='_blank'>supports HTML5 video</a></p></video>";
    video = wrapper.firstChild;

    //this.refs.AttachVideo.appendChild(video);
    $('#attach-video').append(video);
    return videojs(video, {});
  }, */

  componentWillRecieveProps: function(nextProps){

  },

  render: function(){
    var iconBtnElem = (<IconButton iconClassName="material-icons" iconStyle={ {color: "#fff"} } onClick={ AddVideoActions.dismiss }>arrow_back</IconButton>);

    return (
        <Dialog
          ref="AddVideoModal"
          modal={true}
          autoDetectWindowHeight={false}
          contentStyle={{"padding":"0px", "margin": "0px", "width":"100%", "height":"100%"}}
          bodyStyle={{"padding":"0px !important"}} >
            <AppBar
              title="Add Video"
              iconElementLeft={iconBtnElem} />
            <CardMedia>
              <video id="add-video-player" className='video-js vjs-default-skin' src={this.props.vidsrc} controls preload='auto' poster='' data-setup='{}' height="264" onclick="this.play()">
                <p className='vjs-no-js'>To view this video please enable JavaScript, and consider upgrading to a web browser that <a href='http://videojs.com/html5-video-support/' target='_blank'>supports HTML5 video</a></p>
              </video>
              <div id="snap-shots">
                {
                  this.props.snaps.map(function(src, i){
                    return <img src={src} key={i} id="snapimg-{i}" width="72" height="60" className="vid-snaps"/>
                  })
                }
              </div>
            </CardMedia>
        </Dialog>
    )
  }
})
