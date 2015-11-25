var { Tabs, Tab, IconButton, FontIcon } = MUI;

FroTabs = React.createClass({
  propTypes: {
    tabIndex: React.PropTypes.number,
    slideIndex: React.PropTypes.number
  },

  getDefaultProps: function(){
    return {
      tabIndex: 1,
      slideIndex: 1
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

  componentDidMount: function(){
    console.log("tab ref child " + this.props.children.toArray());
    console.log("tab ref " + this.props.children.toArray());
    // this.view = Blaze.render(Template.comments, $('#tab-comments')[0]);
  },

  componentWillUnmount() {
    // Clean up Blaze view
    Blaze.remove(this.view);
  },

  _handleChangeIndex: function(index) {
    console.log("slide index: ", index);
    Session.set('tabIndex', index+2)
    // this.setState({
    //   slideIndex: index,
    // });
  },

  _handleChangeTabs: function(index) {
    console.log("tab index: ", index);
    Session.set('slideIndex', index-2)
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
        <Tabs onChange={this._handleChangeTabs} value={""+this.props.tabIndex}>
          <Tab label={<FontIcon className="fa fa-film tab-icon"/>} value="2"/>
          <Tab label={<FontIcon className="fa fa-comments tab-icon"/>} value="3"/>
          <Tab label={<IconButton iconClassName="fa fa-desktop tab-icon"/>} value="4"/>
        </Tabs>
        <SwipeableViews index={this.props.slideIndex} onChangeIndex={this._handleChangeIndex}>
          <div>
            <h2 style={styles.headline}>Tabs with slide effect</h2>
            Swipe to see the next slide.<br />
          </div>
          <div style={styles.slide} ref="tabComments">
            <div id="tab-comments"></div>
          </div>
          <div style={styles.slide}>
            slide n°3
          </div>
        </SwipeableViews>
        <div ref="testDiv" id="test-div"></div>
      </div>
    );
  }
});
