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

  _handleFeedback: function(){
    var msg = this.refs.feedmsg.getValue();
    var data = {
      message: msg
    };

    Meteor.call("feedback", data, function(error){
      console.log("feedback callback ");
      if(error){
        console.log("feedback error " + error);
      }else{
        FroActions.alert("_/\\_ Thank You :)");
        FlowRouter.go("/");
      }
    });
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
          ref="feedmsg" />

        <RaisedButton
          label="Send"
          secondary={true}
          style={styles.boxBtn}
          onTouchTap={this._handleFeedback} />
      </Card>
    )
  }
});
