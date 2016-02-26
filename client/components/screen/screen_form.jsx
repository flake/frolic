var {
  List,
  ListItem,
  Divider,
  Card,
  CardText,
  CardMedia,
  TextField,
  FlatButton,
  RaisedButton,
  FontIcon,
  Avatar
} = MUI;

// injectTapEventPlugin();

ScreenForm = React.createClass({
  propTypes: {
    action: React.PropTypes.string,
    screen: React.PropTypes.object
  },
  getDefaultProps: function(){
    return {
      action: "new",
      screen: {
        title: 'Set Title',
        description: '...',
        cover: () => {return AIMG.cover;},
        avatar: () => {return AIMG.cover;}
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
    return {
      title: this.props.screen.title,
      description: this.props.screen.description,
      cover: this.props.screen.cover(),
      avatar: this.props.screen.avatar()
    }
  },

  _openFileDialog: function(context){
    Session.set('file-context', context);
    console.log("file context on open %s and %s", context, Session.get('file-context'));
    ReactDOM.findDOMNode(this.refs.fileUpload).click();
  },

  _handleUpload: function(event){
    var self = this;
    var ifile = event.target.files[0];
    ifile.owner = Meteor.userId();

    FroActions.progress(true, 'Uploading...');

    readURL(event.target, function(result){
      if(Session.get('file-context') === 'screen-fsid'){
        console.log("setting cover...");
        self.setState({cover: result});

        ScreensFS.insert(ifile, function(err, fileObj){
          FroActions.progress(false);
          if(err){
            console.log("FS Error: ScreenFS insert failed ", err);
            FroActions.alert(err);
          }else{
            Session.set('screen-fsid', fileObj._id);
            FroActions.alert("Upload success!");
          }
        });
      }
      if(Session.get('file-context') === 'avatar-fsid'){
        console.log("setting avatar...");
        self.setState({avatar: result});

        ProFS.insert(ifile, function(err, fileObj){
          FroActions.progress(false);
          if(err){
            console.log("FS Error: ProFS insert failed ", err);
          }else{
            Session.set('avatar-fsid', fileObj._id);
            FroActions.alert("Upload success!");
          }
        });
      }
    });

    // var fsFile = new FS.File(ifile);

    // console.log("handle upload file ", ifile);

  },

  _handleTitleChange: function(event){
    // console.log("event change value ", event.target.value);
    this.setState({title: event.target.value});
  },

  _handleDescChange: function(event){
    console.log("desc change value ", event.target.value);
    this.setState({description: event.target.value});
  },

  render: function(){

    var styles = {
      formList: {
        margin: "8px",
        marginTop: "0"
      },
      formListItem: {
        paddingLeft: "48px"
      },
      formTitle: {
        fontSize: "16px",
        fontWeight: "800"
      },
      screenForm: {
        margin: "8px"
      },
      uploadLabel: {
        fontWeight: "normal",
        textTransform: "none",
      },
      uploadBtn: {
        width: "100%",
        textAlign: "left"
      },
      avatar: {
        border: "2px solid " + APP.themeLite,
        top: '-36px',
        left: "8px"
      },
      cover: {
        height: "204px",
        maxHeight: "204px"
      },
      img: {
        height: "100%",
        width: "100%"
      },
      listInnerDiv:{
        color: "#fff",
        padding: '8px 72px'
      },
      flatBtnIcon:{
        display: 'inline-block',
        verticalAlign: 'middle',
        lineHeight: '27px',
        color: APP.primary,
        top: '12px'
      }
    };

    var formActLabel = "Add";

    if(this.props.action.toLowerCase() === "edit"){
      formActLabel = "Save";
    };
    var avatar = (
      <Avatar
        src={this.state.avatar}
        size={56}
        style={styles.avatar}
        onClick={this._openFileDialog.bind(this, 'avatar-fsid')}
      />);
    var description = (
      <div style={{"color": "#fff"}}>{this.state.description}</div>
    );
    var overCard = (
      <ListItem
        primaryText={this.state.title}
        secondaryText={description}
        leftAvatar={avatar}
        disabled={true}
        innerDivStyle={styles.listInnerDiv}
        style={{"color": "#fff"}}
      />
    );

    return (
      <List
        subheader={captalize(this.props.action) + " Screen"}
        style={styles.formList}
        subheaderStyle={styles.formTitle} >
        <ListItem
          disabled={true} >
          <CardMedia
            overlay={overCard}
            mediaStyle={styles.cover}
          >
            <img src={this.state.cover} style={styles.img}/>
          </CardMedia>
        </ListItem>
        <ListItem
          primaryText={
            <TextField
              hintText="Title"
              defaultValue={this.props.screen.title}
              fullWidth={true}
              onChange={this._handleTitleChange}
              id="screen-title" />
          }
          disabled={true}
          style={styles.formListItem}
          leftIcon={
            <FontIcon
              className="material-icons"
              style={styles.flatBtnIcon} >
              card_membership
            </FontIcon>
          } />
        <ListItem
          primaryText={
            <TextField
              hintText="Description"
              defaultValue={this.props.screen.description}
              fullWidth={true}
              multiLine={true}
              rowsMax={12}
              onChange={this._handleDescChange}
              id="screen-desc" />
          }
          disabled={true}
          style={styles.formListItem}
          leftIcon={
            <FontIcon
              className="material-icons"
              style={styles.flatBtnIcon} >
              description
            </FontIcon>
          } />
        <ListItem
          primaryText={
            <FlatButton
              label="Cover Photo"
              labelStyle={styles.uploadLabel}
              style={styles.uploadBtn}
              onClick={this._openFileDialog.bind(this, 'screen-fsid')} >
            </FlatButton>
          }
          disabled={true}
          leftIcon={
            <FontIcon
              className="material-icons"
              style={styles.flatBtnIcon} >
              file_upload
            </FontIcon>
          }
          style={styles.formListItem} />
        <Divider />
        <ListItem
          primaryText={
            <div>
              <RaisedButton
                label={formActLabel}
                secondary={true}
                fullWidth={true}
                id="screen-submit" />
              <input
                ref="fileUpload"
                type="file"
                style={{"display": "none"}}
                onChange={this._handleUpload} />
              <input
                type="hidden"
                id="screen-id"
                value={this.props.screen._id} />
            </div>
          }
          disabled={true} />
      </List>
    )
  }
});


// <Card style={styles.screenForm}>
//   <CardText>
//     <TextField
//       hintText="Title"
//       fullWidth={true} />
//     <FlatButton
//       label="Cover Photo"
//       labelStyle={styles.uploadLabel}
//       labelPosition="after"
//       style={styles.uploadBtn}
//       onClick={this._openFileDialog} >
//       <FontIcon
//         style={Styles.flatBtnIcon}
//         className="material-icons" >file_upload</FontIcon>
//     </FlatButton>
//     <input
//       ref="fileUpload"
//       type="file"
//       style={{"display": "none"}}
//       id="screen-upload" />
//   </CardText>
// </Card>
