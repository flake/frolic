var {
  Card,
  CardTitle,
  CardText
} = MUI;

FroInfo = React.createClass({
  PropTypes: {
    frolicId: React.PropTypes.object
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
    return { };
  },

  render: function(){
    // var frolicInfo = Frolics.findOne(this.props.frolicId);

    return (
      <Card style={Styles.commentBox}>
        <CardTitle title={this.props.frolic.title} style={{padding: "8px", lineHeight: "normal"}}/>
        <CardText style={{padding: "8px", paddingTop: "0"}}>
           something something
        </CardText>
      </Card>
    )
  }
})
