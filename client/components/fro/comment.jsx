var { Card, Avatar } = MUI;

CommentItem = React.createClass({
  PropTypes: {
    comment: React.PropTypes.object
  },

  getDefaultProps: function(){
    return {
      comment: {}
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
    return { }
  },

  render: function(){
    var styles = {
      commentBox: {
        padding: "8px",
        height: "100%"
      },
      titleStyle: {
        fontSize: "14px",
        fontWeight: "900",
        paddingBottom: "0"
      },
      subtitleStyle:{
        fontSize: "12px",
        marginTop: "2px"
      },
      container:{
        display: "inline-block",
        verticalAlign: "top",
        width: "calc(100% - 42px)"
      },
      commentText:{
        marginLeft: "8px",
        fontSize: "13px"
      }
    };

    return (
      <Card style={styles.commentBox} >
        <Avatar
          src={this.props.comment.author().avatar()}
          style={Styles.froAvatar} />
        <div style={styles.container}>
          <span style={styles.titleStyle}>{this.props.comment.author().profile.name}</span>
          <span style={styles.commentText}>{this.props.comment.content}</span>
          <div style={styles.subtitleStyle}>{this.props.comment.datePublished()}</div>
        </div>
      </Card>
    )
  }
});
