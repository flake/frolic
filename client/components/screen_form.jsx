var {
  List,
  ListItem,
  ListDivider,
  Card,
  CardText,
  TextField,
  FlatButton,
  RaisedButton,
  FontIcon
} = MUI;

injectTapEventPlugin();

ScreenForm = React.createClass({
  propTypes: {
    action: React.PropTypes.string,
    screen: React.PropTypes.object
  },
  getDefaultProps: function(){
    return {
      action: "new",
      screen: {}
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

  _openFileDialog: function(){
    // var fileUploadDom = React.findDOMNode(this.refs.fileUpload).click();
    // fileUploadDom.click();

    ReactDOM.findDOMNode(this.refs.fileUpload).click();
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
      }
    };

    var formActLabel = "Add";
    if(this.props.action.toLowerCase() === "edit")
      formActLabel = "Save";

    return (
      <List
        subheader={captalize(this.props.action) + " Screen"}
        style={styles.formList}
        subheaderStyle={styles.formTitle} >
        <ListItem
          primaryText={
            <TextField
              hintText="Title"
              fullWidth={true}
              id="screen-title" />
          }
          disabled={true}
          style={styles.formListItem}
          leftIcon={
            <FontIcon
              className="material-icons"
              style={Styles.flatBtnIcon} >
              card_membership
            </FontIcon>
          } />
          <ListItem
            primaryText={
              <TextField
                hintText="Description"
                fullWidth={true}
                multiLine={true}
                rowsMax={12}
                id="screen-desc" />
            }
            disabled={true}
            style={styles.formListItem}
            leftIcon={
              <FontIcon
                className="material-icons"
                style={Styles.flatBtnIcon} >
                description
              </FontIcon>
            } />
        <ListItem
          primaryText={
            <FlatButton
              label="Cover Photo"
              labelStyle={styles.uploadLabel}
              style={styles.uploadBtn}
              onClick={this._openFileDialog} >
              <input
                ref="fileUpload"
                type="file"
                style={{"display": "none"}}
                id="screen-upload" />
            </FlatButton>
          }
          disabled={true}
          leftIcon={
            <FontIcon
              className="material-icons"
              style={Styles.flatBtnIcon} >
              file_upload
            </FontIcon>
          }
          style={styles.formListItem} />
        <ListDivider />
        <ListItem
          primaryText={
            <RaisedButton
              label={formActLabel}
              secondary={true}
              fullWidth={true}
              id="screen-submit" />
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
