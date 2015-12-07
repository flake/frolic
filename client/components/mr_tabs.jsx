var {
  Tabs,
  Tab,
  IconButton
} = MUI;

MrTabs: React.creatClass({
  propTypes:{
    // tempaltes = { 'title': 'tab title', }
    templates: React.PropTypes.Array
  },

  getDefaultProps: function(){
    return {
      templates: [
        {'name': 'tabInfo', 'title': 'Info', 'iconClass': 'material-icons', 'maticon': 'info_outline', 'data': {}},
        {'name': 'tabInfo', 'title': 'Info', 'iconClass': 'material-icons', 'maticon': 'info_outline', 'data': {}},
        {'name': 'tabInfo', 'title': 'Info', 'iconClass': 'material-icons', 'maticon': 'info_outline', 'data': {}}
      ]
    }
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
    return (
      <div>
        <Tabs onChange={this._handleChangeTabs.bind(this)} value={this.props.slideIndex + ''}>
          <Tab label="Tab One" value="0" />
          <Tab label="Tab Two" value="1" />
          <Tab label="Tab Three" value="2" />
        </Tabs>
        <SwipeableViews index={this.props.slideIndex} onChangeIndex={this._handleChangeIndex} style={styles.container} resistance={true} >
          <div style={styles.slide} className="tab-slides">
            <h5>Hello tab one</h5>
          </div>
        </SwipeableViews>
      </div>
    );
  }
});
