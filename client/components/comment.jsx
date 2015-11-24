var { CardHeader, Avatar } = MUI;

CommentItem = React.createClass({
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

    return (
      <CardHeader
        title={this.props.comment.user().profile.name}
        titleStyle={styles.titleStyle}
        subtitle={this.props.comment.datePublished()}
        subtitleStyle={styles.subtitleStyle}
        titleColor={APP.secondary}
        avatar={<Avatar backgroundColor={APP.themeGrey} style={styles.froAvatar}>A</Avatar>}
        style={styles.headerBox} >
      </CardHeader>
    )
  }
});
