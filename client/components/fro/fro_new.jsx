var {
  CardMedia,
  IconButton,
  RaisedButton,
  TextField,
  Slider
} = MUI;

FroNew = React.createClass({
  propTypes: {
    frosrc: React.PropTypes.string
  },
  getDefaultProps: function(){
    return {
      frosrc: ''
      // snaps: []
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
    return {
      seekValue: 0
    }
  },

  _handleSeek(event, value){
    this.setState({seekValue: value});
  },

  render: function(){
    // var snapsCount = this.props.snaps.length;

    var styles = {
      scrollBox: {
        overflowX: "scroll",
        width: "100%",
        height: "64px"
      },
      // snapBox: {
      //   width: snapsCount * 74
      // },
      actionBar:{
        backgroundColor: "#fff",
        textAlign: "center",
        padding: "8px",
        paddingTop: "16px"
      },
      boxBtn:{
        width: "46%",
        marginRight: "6px"
      },
      froSnap:{
        border: "1px solid " + APP.themeBg
      },
      froSeek: {
        margin: "0 8px"
      }
    };

    return (
      <div>
        <CardMedia>
          <video className='video-js vjs-default-skin' src={this.props.frosrc} controls preload='auto' poster='' data-setup='{}' height="240">
            <p className='vjs-no-js'>Video Not Supportted</p>
          </video>
        </CardMedia>

        <div style={styles.actionBar}>
          <TextField
            hintText="Title"
            floatingLabelText="Title"
            fullWidth={true}
            id="fro-title" />
          <TextField
            hintText="Screen"
            floatingLabelText="Screen"
            fullWidth={true}
            id="fro-tagline" />
          <RaisedButton
            label="Save"
            secondary={true}
            style={styles.boxBtn}
            className="frolic-upload"
            id="frolic-save" />
          <RaisedButton
            label="Publish"
            secondary={true}
            style={styles.boxBtn}
            className="frolic-upload"
            id="frolic-publish" />
        </div>
      </div>
    )
  }
});

// <Slider
//   name="froseek-up"
//   value={this.state.seekValue}
//   style={styles.froSeek}
//   onChange={this._handleSeek} />
// <CardMedia>
//   <div style={styles.scrollBox} >
//     <div style={styles.snapBox}>
//       {
//         this.props.snaps.map(function(src, i){
//           return <img src={src} key={i} id="snapimg-{i}" width="72" height="60" className="vid-snaps" style={styles.froSnap}/>
//         })
//       }
//     </div>
//   </div>
// </CardMedia>
// <Slider
//   name="froseek-down"
//   value={this.state.seekValue}
//   style={styles.froSeek}
//   onChange={this._handleSeek} />
