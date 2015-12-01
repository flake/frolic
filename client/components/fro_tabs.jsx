var { Tabs, Tab, IconButton, FontIcon } = MUI;

// const FrInfo = BlazeToReact('_froinfo');
// const Comments = BlazeToReact('comments');
const VScroll = BlazeToReact('vscroll');

FroTabs = React.createClass({
  propTypes: {
    slideIndex: React.PropTypes.number,
    frolic: React.PropTypes.object,
    frolicId: React.PropTypes.string
  },

  getDefaultProps: function(){
    return {
      slideIndex: 0,
      frolic: {},
      frolicId: ''
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
    console.log("slide index: ", index);
    $(".nav-tabs").removeClass("tab-active");
    $(".nav-tabs").eq(index).addClass("tab-active");

    // Session.set('tabIndex', index);
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
    console.log("frodata " + frodata);
    prettyJSON(frodata);

    return (
      <div>
        <SwipeableViews index={this.props.slideIndex} onChangeIndex={this._handleChangeIndex} style={styles.container} resistance={true}>
          <div style={styles.slide} className="tab-slides">
            <FroInfo frolic={this.props.frolic}/>
          </div>
          <div style={styles.slide} className="tab-slides">
            <VScroll page='comments' data={frodata} />
          </div>
          <div style={styles.slide} className="tab-slides">

          </div>
        </SwipeableViews>
      </div>
    )
  }
});

// <Comments frolicId={this.props.frolicId}/>

// <Tabs onChange={this._handleChangeTabs} value={""+this.props.tabIndex}>
//   <Tab label={<IconButton iconClassName="fa fa-film tab-icon"/>} value="2"/>
//   <Tab label={<IconButton iconClassName="fa fa-comments tab-icon"/>} value="3"/>
//   <Tab label={<IconButton iconClassName="fa fa-desktop tab-icon"/>} value="4"/>
// </Tabs>
