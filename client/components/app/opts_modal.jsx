var {
  Dialog,
  FlatButton,
  List,
  ListItem,
  FontIcon,
  Avatar
} = MUI;

OptsModal = React.createClass({
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
    Session.set('optsOpen', false);
  },

  _handleRecord: function(event){
    Session.set('optsOpen', false);
    FroActions.record();
  },

  _handleUpload: function(event){
    Session.set('optsOpen', false);
    FlowRouter.go('/fro/new');
    FroActions.upload();
  },

  render: function(){
    var styles = {
      optsBody: {
        paddingBottom: 0
      },
      modalIcon: {
        fontSize: "21px",
        width: "21px",
        height: "21px"
      },
      modalItem:{
        margin: "8px 0"
      },
      modalText: {
        padding: "12px 8px 12px 54px",
        color: "#444",
        fontSize: "14px",
        fontWeight: "500"
      },
      modalAvatar: {
        top: 0,
        left: 0
      }
    };

    let customActions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this._closeModal} />
    ];

    return (
      <Dialog
        modal={true}
        open={this.props.open}
        actions={customActions}
        bodyStyle={styles.optsBody} >
        <List subheader="NEW FRO" key={0}>
          <ListItem
            leftAvatar={
              <Avatar
                icon={<FontIcon className="material-icons" style={styles.modalIcon}>videocam</FontIcon>}
                color="#fff"
                backgroundColor="#ED2B2B"
                style={styles.modalAvatar} />}
            primaryText="RECORD"
            innerDivStyle={styles.modalText}
            style={styles.modalItem}
            onTouchTap={this._handleRecord} />
          <ListItem
            leftAvatar={
              <Avatar
                icon={<FontIcon className="material-icons" style={styles.modalIcon}>file_upload</FontIcon>}
                color="#fff"
                backgroundColor={APP.primary}
                style={styles.modalAvatar} />}
            primaryText="UPLOAD"
            innerDivStyle={styles.modalText}
            style={styles.modalItem}
            onTouchTap={this._handleUpload} />
        </List>
      </Dialog>
    )
  }
});

// leftIcon={<FontIcon className="fa fa-video-camera" style={styles.modalIcon} />}
// leftIcon={<FontIcon className="fa fa-upload" style={styles.modalIcon} />}
