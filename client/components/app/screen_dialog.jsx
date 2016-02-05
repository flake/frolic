var {
  List,
  ListItem,
  TextField,
  RaisedButton,
  Dialog,
  FlatButton,
  FontIcon
} = MUI;

ScreenDialog = React.createClass({
  propTypes: {
    open: React.PropTypes.bool
  },
  getDefaultProps: function(){
    return {
      open: false
    }
  },

  //IMPORTANT SET CHILD CONTEXT
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function(){
    return {
      muiTheme: newTheme
    };
  },

  _closeModal: function(){
    Session.set('screenDialog', false);
  },

  _submitScreen: function(){
    var screen = {
      title: this.refs.screenTitle.getValue()
    }

    Meteor.call('addScreen', screen, function(err, result){
      Session.set('screenDialog', false);
    });
  },

  render: function(){
    var styles = {
      dialogBodyStyle: {
        padding: "0px !important"
      },
      dialogStyle:{
        zIndex: "100",
        padding: "0px !important"
      },
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
      modalText: {
        padding: "12px 8px",
        color: "#444",
        fontSize: "14px",
        fontWeight: "500"
      }
    };

    let customActions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this._closeModal} />,
      <FlatButton
        label="Done"
        secondary={true}
        onTouchTap={this._submitScreen} />
    ];

    return (
      <Dialog
        open={this.props.open}
        actions={customActions}
        bodyStyle={styles.dialogBodyStyle}
        contentStyle={{"padding":"0px"}}
        style={styles.dialogStyle} >
        <List
        subheader="New Screen"
        style={styles.formList}
        subheaderStyle={styles.formTitle}>
          <ListItem
            primaryText={
              <TextField
                hintText="Title"
                fullWidth={true}
                ref="screenTitle"
                id="screen-title" />
            }
            disabled={true}
            style={styles.formListItem}
            innerDivStyle={styles.modalText}
             />
        </List>
      </Dialog>
    )
  }
});

// leftIcon={
//   <FontIcon
//     className="material-icons"
//     style={Styles.flatBtnIcon} >
//     card_membership
//   </FontIcon>
// }
//
