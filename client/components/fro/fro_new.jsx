var {
  CardMedia,
  IconButton,
  RaisedButton,
  TextField,
  Slider,
  DropDownMenu,
  MenuItem
} = MUI;

FroNew = React.createClass({
  propTypes: {
    screens: React.PropTypes.array
  },
  getDefaultProps: function(){
    return {
      screens: []
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
    var value = 0;
    if(this.props.screens[0]){
      value = this.props.screens[0]._id;
    }
    return {
      value: value
    }
  },

  _handleScreens(event, index, value){
    this.setState({value: value});
    if(value === 0){
      console.log("open new screen here... ");
      Session.set('screenDialog', true);
    }
  },

  render: function(){
    // var snapsCount = this.props.snaps.length;

    var styles = {
      screensMenu:{
        width: "100%"
      },
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
        marginRight: "6px",
        marginTop: "8px",
        marginBottom: "8px"
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
        <form id="fro-new-form" class="validate">
          <div style={styles.actionBar}>
            <TextField
              hintText="Title"
              floatingLabelText="Title"
              fullWidth={true}
              id="fro-title"
              data-onblur
              data-alphanumeric
              data-msg="Title can only have [A-Z] [0-9] characters" />
            <TextField
              hintText="Description"
              floatingLabelText="Description"
              fullWidth={true}
              id="fro-desc" />
            <DropDownMenu
              maxHeight={200}
              autoWidth={false}
              value={this.state.value}
              onChange={this._handleScreens}
              style={styles.screensMenu}>
              {
                this.props.screens.map(function(screen, i){
                  return <MenuItem value={screen._id} key={i} primaryText={screen.title} />
                })
              }
              <MenuItem value={0} key={this.props.screens.length} primaryText="New Screen" />
            </DropDownMenu>

            <RaisedButton
              label="Publish"
              secondary={true}
              style={styles.boxBtn}
              className="frolic-upload"
              id="frolic-publish" />
            <input type="hidden" value={this.state.value} id="fro-screen" />
          </div>
        </form>
      </div>
    )
  }
});

// <RaisedButton
//   label="Save"
//   secondary={true}
//   style={styles.boxBtn}
//   className="frolic-upload"
//   id="frolic-save" />

// <TextField
//   hintText="Screen"
//   floatingLabelText="Screen"
//   fullWidth={true}
//   id="fro-screen" />

// <CardMedia>
//   <video className='video-js vjs-default-skin' src={this.props.frosrc} controls preload='auto' poster='' data-setup='{}' height="240">
//     <p className='vjs-no-js'>Video Not Supportted</p>
//   </video>
// </CardMedia>

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
