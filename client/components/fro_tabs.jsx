var { Tabs, Tab, IconButton, FontIcon } = MUI;

// const Comments = BlazeToReact('comments');
const VScroll = BlazeToReact('vscroll');

FroTabs = React.createClass({
  propTypes: {
    tabIndex: React.PropTypes.number,
    slideIndex: React.PropTypes.number,
    frolicId: React.PropTypes.string
  },

  getDefaultProps: function(){
    return {
      tabIndex: 2,
      slideIndex: 0,
      frolic: ''
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

  // componentDidMount: function(){
    // var index = this.refs.tabSlides.props.index;
    // console.log("tab ref child ");
    // console.log("tab ref " + $('.tab-slides')[index]);
    //
    // this.view = Blaze.render(Template.comments, $('.tab-slides')[index]);

    // console.log("fro_tabs prop: " + typeof(this.props.frolicId));
  // },
  //
  // componentWillUnmount() {
  //   // Clean up Blaze view
  //   // Blaze.remove(this.view);
  // },

  _handleChangeIndex: function(index) {
    console.log("slide index: ", index);
    $(".nav-tabs").removeClass("tab-active");
    $(".nav-tabs").eq(index).addClass("tab-active");

    Session.set('tabIndex', index);
  },

  // _handleChangeTabs: function(index) {
  //   console.log("tab index: ", index);
  //   Session.set('slideIndex', index-2);
  //   console.log("slide index: ", Session.get('slideIndex'));
  //   // this.setState({
  //   //   slideIndex: parseInt(value, 10),
  //   // });
  // },

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
      container: {
        height: "100%"
      },
      slide: {
        margin: "8px",
        height: "365px"
      }
    };

    var frodata = {frolicId: this.props.frolicId};

    return (
      <div>
        <SwipeableViews index={this.props.slideIndex} onChangeIndex={this._handleChangeIndex} style={styles.container}>
          <div style={styles.slide} className="tab-slides">
            <VScroll page="_froinfo" data={frodata} />
          </div>
          <div style={styles.slide} className="tab-slides">
            <VScroll page="comments" data={frodata} />
          </div>
          <div style={styles.slide} className="tab-slides">
            slide n°3
          </div>
        </SwipeableViews>
        <div ref="testDiv" id="test-div"></div>
      </div>
    );
  }
});

// <Comments frolicId={this.props.frolicId}/>

// <Tabs onChange={this._handleChangeTabs} value={""+this.props.tabIndex}>
//   <Tab label={<IconButton iconClassName="fa fa-film tab-icon"/>} value="2"/>
//   <Tab label={<IconButton iconClassName="fa fa-comments tab-icon"/>} value="3"/>
//   <Tab label={<IconButton iconClassName="fa fa-desktop tab-icon"/>} value="4"/>
// </Tabs>
