var { Snackbar, IconButton, TextField, Card } = MUI;

NewComment = React.createClass({
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
    return { };
  },

  // commentChange: function(event){
  //   console.log("comment blurred " + event);
  // },

  render: function(){
    var styles = {
      commentCard: {
        padding: "8px",
        width: "100%"
      },
      addBtn: {
        float: "right",
        marginRight: "16px"
      },
      iconBtn: {
        fontSize: "32px",
        color: APP.primary
      },
      commentText: {
        width: "80%"
      }
    };

    return (
      <Card style={styles.commentCard}>
        <TextField hintText="Write Comment..." id="comment-text" style={styles.commentText} multiLine={true}/>
        <IconButton iconClassName="material-icons" id="add-comment" style={styles.addBtn} iconStyle={styles.iconBtn}>insert_comment</IconButton>
      </Card>
    )
  }
});
