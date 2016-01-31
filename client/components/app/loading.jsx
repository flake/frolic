var {CircularProgress, LinearProgress} = MUI;
Loading = React.createClass({
  propTypes: {
    overlay: React.PropTypes.bool,
    circular: React.PropTypes.bool,
    size: React.PropTypes.number
  },
  getInitialState: function(){
    return {}
  },
  getDefaultProps: function(){
    return {
      overlay: false,
      circular: true,
      size: 0.5
    }
  },
  //IMPORTANT SET CHILD CONTEXT
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function(){
    return {
      muiTheme: newTheme
    };
  },
  render: function(){
    var styles = {
      container: {
        textAlign: "center",
        height: "100%",
        marginTop: "45% !important"
      },
      overlay: {
        position: "fixed",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        background: "rgba(255, 255, 255, 0) !important",
        zIndex: 98
      }
    };

    if(this.props.circular){
      var Progress = CircularProgress;
    }else{
      var Progress = LinearProgress;
    }

    var containerStyles = styles.container;
    if(this.props.overlay)
      containerStyles = _.extend(containerStyles, styles.overlay);

    return (
      <div style={containerStyles}>
        <Progress mode="indeterminate" size={this.props.size} />
      </div>
    )
  }
})
