var {
  Dialog,
  TextField,
  FlatButton
} = MUI;

CircleNew = React.createClass({
  PropTypes: {
    open: React.PropTypes.bool
  },
  getDefaultProps: function(){
    return {
      open: false
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
    return {
      open: false
    };
  },

  _createCirle: function(){
    console.log("createCircle title " + this.refs.newCircle.getValue());
    Meteor.call('newCircle', this.refs.newCircle.getValue(), function(result){
      Session.set('openCircleNew', false);
    });
  },

  _handleCancel: function(){
    Session.set('openCircleNew', false);
  },

  render: function(){
    var styles = {
      newCircleDialog: {
        zIndex: 199
      }
    };

    var actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this._handleCancel}/>,
      <FlatButton
        label="Create"
        secondary={true}
        onTouchTap={this._createCirle}/>
    ];

    return (
      <Dialog
        modal={false}
        actions={actions}
        title="Create new Circle"
        open={this.props.open}
        style={styles.newCircleDialog}
        bodyStyle={Styles.dialogBody}
        >
        <TextField
          ref="newCircle"
          hintText="Circle Title"
          floatingLabelText="Title"
          fullWidth={true} />

      </Dialog>
    )
  }
});
