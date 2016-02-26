var {
  Dialog,
  CircularProgress,
  FlatButton
} = MUI;

FroSpinner = React.createClass({
  PropTypes: {
    open: React.PropTypes.bool,
    message: React.PropTypes.string
  },
  getDefaultProps: function(){
    return {
      open: false,
      message: 'Loading...'
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

  render: function(){
    // var displaySpin = (this.props.spinner) ? "inline-block" : "none";
    var styles = {
      froDialog: {
        zIndex: 299
      },
      spinner: {
        display: 'inline-block',
        verticalAlign: 'middle',
        paddingRight: '16px'
      },
      message: {
        display: "inline-block"
      }
    };

    return (
      <Dialog
        modal={false}
        title={APP.title}
        titleStyle={Styles.dialogTitle}
        open={this.props.open}
        style={styles.froDialog}
        bodyStyle={Styles.dialogBody} >
        <div style={styles.spinner}>
          <CircularProgress mode="indeterminate" size={0.5} />
        </div>
        <div style={styles.message}>
          {this.props.message}
        </div>
      </Dialog>
    )
  }
});
