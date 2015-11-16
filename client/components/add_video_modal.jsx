var {
  AppCanvas,
  AppBar,
  CardMedia,
  IconButton,
  Dialog,
  RaisedButton,
  TextField
 } = MUI;

AddVideoModal = React.createClass({
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

    var styles = {
      scrollBox: {
        overflowX: "scroll",
        width: "100%",
        height: "60px"
      },
      snapBox: {
        width: "2000px"
      },
      actionBar:{
        width: "100%",
        backgroundColor: "#fff",
        textAlign: "center",
        padding: "8px",
        paddingTop: "16px"
      },
      boxBtn:{
        width: "46%",
        marginRight: "6px"
      }
    };

    return (
        <Dialog
          ref="AddVideoModal"
          modal={true}
          autoDetectWindowHeight={false}
          autoScrollBodyContent={true}
          style={{"zIndex": "2001", "padding": "0px !important", "top": "-80px", "height": "114%"}}
          bodyStyle={{"padding":"0px !important"}}
          contentStyle={{"padding":"0px", "margin": "0px", "width":"100%"}} >
          <AppBar
            title="New Fro"
            iconElementLeft={iconBtnElem} />

            <CardMedia>
              <video id="add-video-player" className='video-js vjs-default-skin' src={this.props.vidsrc} controls preload='auto' poster='' data-setup='{}' height="240" onclick="this.play()">
                <p className='vjs-no-js'>To view this video please enable JavaScript, and consider upgrading to a web browser that <a href='http://videojs.com/html5-video-support/' target='_blank'>supports HTML5 video</a></p>
              </video>
              <div style={styles.scrollBox} >
                <div id="snap-shots" style={styles.snapBox}>
                  {
                    this.props.snaps.map(function(src, i){
                      return <img src={src} key={i} id="snapimg-{i}" width="72" height="60" className="vid-snaps"/>
                    })
                  }
                </div>
              </div>
            </CardMedia>
            <div style={styles.actionBar}>
              <TextField
                hintText="Title"
                floatingLabelText="Title"
                fullWidth={true} />
              <TextField
                hintText="Tagline"
                floatingLabelText="Tagline"
                fullWidth={true} />
              <RaisedButton label="Save" secondary={true} style={styles.boxBtn} className="frolic-upload" id="frolic-save"/>
              <RaisedButton label="Publish" secondary={true} style={styles.boxBtn} className="frolic-upload" id="frolic-publish"/>
            </div>

        </Dialog>
    )
  }
})
