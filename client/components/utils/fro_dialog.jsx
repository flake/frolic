var {
  Dialog,
  FlatButton
} = MUI;

FroDialog = React.createClass({
  PropTypes: {
    open: React.PropTypes.bool,
    message: React.PropTypes.string
  },
  getDefaultProps: function(){
    return {
      open: false,
      message: ""
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

  _handleOk: function(){
    Session.set('openFroDialog', false);
  },

  render: function(){
    // var displaySpin = (this.props.spinner) ? "inline-block" : "none";
    var styles = {
      froDialog: {
        zIndex: 299
      },
      message: {
        display: "inline-block"
      }
    };

    var actions = [
      <FlatButton
        label="OK"
        secondary={true}
        onTouchTap={this._handleOk} />
    ];

    return (
      <Dialog
        modal={false}
        actions={actions}
        title={APP.title}
        titleStyle={Styles.dialogTitle}
        open={this.props.open}
        style={styles.froDialog}
        bodyStyle={Styles.dialogBody} >
        <div style={styles.message}>
          {this.props.message}
        </div>
      </Dialog>
    )
  }
});
