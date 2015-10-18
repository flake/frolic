var { FloatingActionButton, FontIcon } = mui;
AddFloatBtn = React.createClass({
  //IMPORTANT SET CHILD CONTEXT
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function(){
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  getInitialState: function(){
    return { bottom: "-100px" };
  },

  componentDidMount: function(){
    this.show();
  },

  show: function(){
    this.setState({bottom: "10px"});
  },
  hide: function(){
    this.setState({bottom: "-100px"});
  },

  render: function(){
    var styles = {
      container: {
        position: "fixed",
        right: "20px",
        bottom: this.state.bottom,
        transition: "all 0.5s ease",
        zIndex: 10000
      }
    };

    return (
      <div style={styles.container}>
        <FloatingActionButton id="cam-roll">
          <FontIcon className="material-icons">add</FontIcon>
        </FloatingActionButton>
      </div>
    );
  }
})
