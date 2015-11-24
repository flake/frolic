var { Tabs, Tab } = MUI;

FroTabs = React.createClass({
  propTypes: {
    tabIndex: React.PropTypes.string,
    slideIndex: React.PropTypes.string
  },

  getDefaultProps: function(){
    return {
      tabIndex: '1',
      slideIndex: '1'
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

  _handleChangeIndex: function(index) {
    // this.setState({
    //   slideIndex: index,
    // });
  },

  _handleChangeTabs: function(value) {
    // this.setState({
    //   slideIndex: parseInt(value, 10),
    // });
  },

  render: function(){
    var styles = {
      headline: {
        fontSize: 24,
        lineHeight: '32px',
        paddingTop: 16,
        marginBottom: 12,
        letterSpacing: 0,
        fontWeight: "normal",
        color: "#666"
      },
      slide: {
        padding: 10,
      }
    };

    return (
      <div>
        <Tabs onChange={this._handleChangeTabs} value={this.props.tabIndex}>
          <Tab label="Tab One" value="0" />
          <Tab label="Tab Two" value="1" />
          <Tab label="Tab Three" value="2" />
        </Tabs>
        <SwipeableViews index={this.props.slideIndex} onChangeIndex={this._handleChangeIndex}>
          <div>
            <h2 style={styles.headline}>Tabs with slide effect</h2>
            Swipe to see the next slide.<br />
          </div>
          <div style={styles.slide}>
            slide n°2
          </div>
          <div style={styles.slide}>
            slide n°3
          </div>
        </SwipeableViews>
      </div>
    );
  }
});
