var {
  Card,
  TextField,
  RaisedButton
} = MUI;

Feedback = React.createClass({
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
    var styles = {
      feedBox: {
        padding: "8px"
      },
      boxBtn: {
        margin: "8px 0px !important",
      }
    };

    return (
      <Card style={styles.feedBox}>
        <TextField
          hintText="Help us, enhace your experience!"
          floatingLabelText="Message"
          multiLine={true}
          rows={6}
          fullWidth={true}
          id="fro-feedmsg" />

        <RaisedButton
          label="Send"
          secondary={true}
          style={styles.boxBtn}
          id="fro-feedsend" />
      </Card>
    )
  }
});
