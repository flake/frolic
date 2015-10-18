var appPalette = {
  primary1Color: "#1690DB",
  primary2Color: "#2173B3",
  primary3Color: "#A9D2EB",
  accent1Color: "#ED3B3B",
  accent2Color: "#ED2B2B",
  accent3Color: "#F58C8C",
  textColor: 'rgba(0, 0, 0, 0.87)',
  canvasColor: '#1690DB',
  borderColor: '#e0e0e0',
};

var ThemeManager = new mui.Styles.ThemeManager();
ThemeManager.setTheme(ThemeManager.types.LIGHT);
ThemeManager.setPalette(appPalette);

var {AppCanvas, CircularProgress, IconButton} = mui;

Welcome = React.createClass({

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
    return {
      loading: false
    }
  },

  componentDidMount: function(){
    //AppStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function(){
    //AppStore.removeChangeListener(this._onChange);
  },
  _onChange: function(){
  },

  render: function(){
    if(this.state.loading){
      return (
        <Loading circular={true} size={1} overlay={true} />
      );
    }

    return (
      <AppCanvas>
        <div style={{"padding":"16px", "paddingTop": "216px"}}>
          {this.props.content}
        </div>
      </AppCanvas>
    );
  }
});
