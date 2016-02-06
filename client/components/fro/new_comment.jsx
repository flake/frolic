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
        width: "100%",
        border: "1px solid #9FB9C9"
      },
      addBtn: {
        float: "right",
        marginRight: "8px",
        padding: "0"
      },
      iconBtn: {
        fontSize: "32px",
        color: APP.primary
      },
      commentText: {
        width: "calc(100% - 104px)",
        verticalAlign: "bottom"
      }
    };

    return (
      <Card style={styles.commentCard}>
        <IconButton iconClassName="material-icons" style={{padding: "0"}} iconStyle={styles.iconBtn}>insert_comment</IconButton>
        <TextField hintText="Write a Comment..." id="comment-text" style={styles.commentText} multiLine={true}/>
        <IconButton
          iconClassName="material-icons"
          id="add-comment"
          style={styles.addBtn}
          iconStyle={styles.iconBtn}>send</IconButton>
      </Card>
    )
  }
});
